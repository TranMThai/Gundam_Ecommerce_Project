package com.backend_gundam_ecommerce.controller;

import com.backend_gundam_ecommerce.common.dto.request.UserCreateRequest;
import com.backend_gundam_ecommerce.common.dto.response.ApiResponse;
import com.backend_gundam_ecommerce.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
    public ApiResponse<?> findById(@PathVariable(name = "id", required = true) Integer id) {
        return ApiResponse.builder()
                .result(userService.findById(id))
                .build();
    }

    @PostMapping("")
    public ApiResponse<?> create(@RequestBody UserCreateRequest userRequest) {
        return ApiResponse.builder()
                .result(userService.create(userRequest))
                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<?> update(@RequestBody UserCreateRequest userRequest,
                                 @PathVariable(name = "id", required = true) Integer id) {
        return ApiResponse.builder()
                .result(userService.create(userRequest))
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<?> deleteById(@PathVariable(name = "id", required = true) Integer id) {
        userService.deleteById(id);
        return ApiResponse.<Void>builder()
                .build();
    }


}
