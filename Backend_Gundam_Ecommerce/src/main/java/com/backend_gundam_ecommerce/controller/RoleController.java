package com.backend_gundam_ecommerce.controller;

import com.backend_gundam_ecommerce.dto.response.ApiResponse;
import com.backend_gundam_ecommerce.entity.Role;
import com.backend_gundam_ecommerce.exception.AppException;
import com.backend_gundam_ecommerce.exception.ErrorCode;
import com.backend_gundam_ecommerce.service.RoleService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.validation.BindingResult;
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
@RequestMapping("/api/roles")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class RoleController {

    RoleService roleService;

    @GetMapping("")
    ApiResponse<?> findAll() {
        return ApiResponse.builder()
                .result(roleService.findAll())
                .build();
    }

    @GetMapping("/{id}")
    ApiResponse<?> findById(@PathVariable(name = "id") Integer id) {
        return ApiResponse.builder()
                .result(roleService.findById(id)
                        .orElseThrow(() -> new AppException(ErrorCode.NOT_FOUND)))
                .build();
    }

    @PostMapping("")
    ApiResponse<?> create(@Valid @RequestBody Role role) {
        return ApiResponse.builder()
                .result(roleService.save(role))
                .build();
    }

    @PutMapping("/{id}")
    ApiResponse<?> update(@RequestBody Role role,
                          @PathVariable(name = "id") Integer id) {
        if (id != null) {
            return ApiResponse.builder()
                    .result(roleService.save(role))
                    .build();
        }
        return null;
    }

    @DeleteMapping("/{id}")
    ApiResponse<Void> deleteById(@PathVariable(name = "id") Integer id) {
        if (id != null) {
            roleService.deleteById(id);
        }
        return ApiResponse.<Void>builder().build();
    }

}
