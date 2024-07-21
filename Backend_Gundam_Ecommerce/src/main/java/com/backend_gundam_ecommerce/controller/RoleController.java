package com.backend_gundam_ecommerce.controller;

import com.backend_gundam_ecommerce.common.dto.request.RoleRequest;
import com.backend_gundam_ecommerce.common.dto.response.ApiResponse;
import com.backend_gundam_ecommerce.service.RoleService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
    ApiResponse<?> findById(@PathVariable(name = "id", required = true) Integer id) {
        return ApiResponse.builder()
                .result(roleService.findById(id))
                .build();
    }

    @PostMapping("")
    ApiResponse<?> create(@Valid @RequestBody RoleRequest request) {
        return ApiResponse.builder()
                .result(roleService.save(request))
                .build();
    }

    @DeleteMapping("/{id}")
    ApiResponse<Void> deleteById(@PathVariable(name = "id", required = true) Integer id) {
        roleService.deleteById(id);
        return ApiResponse.<Void>builder().build();
    }

}
