package com.backend_gundam_ecommerce.controller;

import com.backend_gundam_ecommerce.common.dto.request.AuthenticationRequest;
import com.backend_gundam_ecommerce.security.dto.request.IntrospectRequest;
import com.backend_gundam_ecommerce.common.dto.response.ApiResponse;
import com.backend_gundam_ecommerce.security.dto.response.AuthenticationResponse;
import com.backend_gundam_ecommerce.security.dto.response.IntrospectResponse;
import com.backend_gundam_ecommerce.security.service.AuthenticationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthController {

    AuthenticationService authenticationService;

    @PostMapping("/token")
    public ApiResponse<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        AuthenticationResponse Authresponse = authenticationService.authenticate(request);
        return ApiResponse.<AuthenticationResponse>builder()
                .result(Authresponse)
                .build();
    }

    @PostMapping("/introspect")
    public ApiResponse<IntrospectResponse> introspect(@RequestBody IntrospectRequest request) {
        IntrospectResponse introspected = authenticationService.introspect(request);
        return ApiResponse.<IntrospectResponse>builder()
                .result(introspected)
                .build();
    }

}
