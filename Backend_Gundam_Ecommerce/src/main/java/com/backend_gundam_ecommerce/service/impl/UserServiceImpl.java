package com.backend_gundam_ecommerce.service.impl;

import com.backend_gundam_ecommerce.dto.request.UserCreateRequest;
import com.backend_gundam_ecommerce.dto.response.UserResponse;
import com.backend_gundam_ecommerce.entity.User;
import com.backend_gundam_ecommerce.config.exception.AppException;
import com.backend_gundam_ecommerce.config.exception.ErrorCode;
import com.backend_gundam_ecommerce.mapper.UserMapper;
import com.backend_gundam_ecommerce.repository.UserRepository;
import com.backend_gundam_ecommerce.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserServiceImpl implements UserService {

    UserRepository userRepository;
    UserMapper userMapper;
    PasswordEncoder passwordEncoder;

    @Override
    public List<UserResponse> findAll() {
        return userRepository.findAll().stream()
                .map(userMapper::toDto)
                .toList();
    }

    @Override
    public UserResponse findById(Integer id) {
        return userRepository.findById(id)
                .map(userMapper::toDto)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_FOUND));
    }

    @Override
    public UserResponse create(UserCreateRequest request) {
        if(userRepository.existsUsersByUsername(request.getUsername())){
            throw new AppException(ErrorCode.USER_EXIST);
        }
        User entity = userMapper.toEntity(request);
        encoding(entity);
        User saveUser = userRepository.save(entity);
        UserResponse response = userMapper.toDto(saveUser);
        return response;
    }

    @Override
    public void deleteById(Integer id) {
        userRepository.deleteById(id);
    }

    private User encoding(User user){
        String newPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(newPassword);
        return user;
    }


}
