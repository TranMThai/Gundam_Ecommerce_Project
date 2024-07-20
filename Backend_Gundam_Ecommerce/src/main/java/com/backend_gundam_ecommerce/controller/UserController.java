package com.backend_gundam_ecommerce.controller;

import com.backend_gundam_ecommerce.dto.request.UserRequest;
import com.backend_gundam_ecommerce.dto.response.ApiResponse;
import com.backend_gundam_ecommerce.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/users")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class UserController {

    UserService userService;

    @GetMapping("")
    public ApiResponse<?> findAll() {
        return ApiResponse.builder()
                .result(userService.findAll())
                .build();
    }


    @GetMapping("/{id}")
    public ApiResponse<?> findById(@PathVariable(name = "id") Integer id) {
        return ApiResponse.builder()
                .result(userService.findById(id))
                .build();
    }

    @PostMapping("")
    public ApiResponse<?> create(@RequestBody UserRequest userRequest) {
        return ApiResponse.builder()
                .result(userService.create(userRequest))
                .build();
    }

}
