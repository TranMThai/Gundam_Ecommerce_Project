package com.backend_gundam_ecommerce.config.security;

import com.backend_gundam_ecommerce.dto.request.AuthenticationRequest;
import com.backend_gundam_ecommerce.dto.request.IntrospectRequest;
import com.backend_gundam_ecommerce.dto.response.AuthenticationResponse;
import com.backend_gundam_ecommerce.dto.response.IntrospectResponse;
import com.backend_gundam_ecommerce.entity.User;
import com.backend_gundam_ecommerce.config.exception.AppException;
import com.backend_gundam_ecommerce.config.exception.ErrorCode;
import com.backend_gundam_ecommerce.repository.UserRepository;
import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSObject;
import com.nimbusds.jose.JWSVerifier;
import com.nimbusds.jose.Payload;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationService {

    @NonFinal
    @Value("${jwt.SIGNER_KEY}")
    String key;
    UserRepository userRepository;
    PasswordEncoder passwordEncoder;

    public AuthenticationResponse authenticate(AuthenticationRequest request) {

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new AppException(ErrorCode.NOT_FOUND));

        boolean isAuth = passwordEncoder.matches(request.getPassword(), user.getPassword());
        if (!isAuth) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }
        String token = generateToken(user);

        return AuthenticationResponse.builder()
                .token(token)
                .build();
    }

    public IntrospectResponse introspect(IntrospectRequest request) {
        try {
            String token = request.getToken();
            JWSVerifier verifier = new MACVerifier(key.getBytes());
            SignedJWT signed = SignedJWT.parse(token);
            boolean verified = verifier.verify(signed.getHeader(),
                    signed.getSigningInput(),
                    signed.getSignature());
            Date expiryTime = signed.getJWTClaimsSet().getExpirationTime();

            return IntrospectResponse.builder()
                    .valid(verified && expiryTime.after(new Date()))
                    .build();
        } catch (JOSEException | ParseException e) {
            throw new AppException(ErrorCode.TOKEN_EXCEPTION);
        }
    }

    private String generateToken(User user) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);

        JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                .subject(user.getUsername())
                .issuer("thai_dep_trai_bo_doi_qua")
                .issueTime(new Date())
                .expirationTime(new Date(
                        Instant.now().plus(100, ChronoUnit.HOURS).toEpochMilli()
                ))
                .claim("user_id", user.getId())
                .claim("scope",user.getRole().getName())
                .build();

        Payload payload = new Payload(claimsSet.toJSONObject());

        JWSObject jwsObject = new JWSObject(header, payload);

        try {
            jwsObject.sign(new MACSigner(key.getBytes()));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            throw new AppException(ErrorCode.TOKEN_EXCEPTION);
        }
    }

}
