package com.backend_gundam_ecommerce.controller;

import com.backend_gundam_ecommerce.dto.request.BrandRequest;
import com.backend_gundam_ecommerce.dto.request.CategoryRequest;
import com.backend_gundam_ecommerce.dto.response.ApiResponse;
import com.backend_gundam_ecommerce.service.BrandService;
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
@RequestMapping("/api/brands")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class BrandController {

    BrandService brandService;

    @GetMapping("")
    ApiResponse<?> findAll() {
        return ApiResponse.builder()
                .result(brandService.findAll())
                .build();
    }

    @GetMapping("/{code}")
    ApiResponse<?> findById(@PathVariable(name = "code", required = true) String code) {
        return ApiResponse.builder()
                .result(brandService.findById(code))
                .build();
    }

    @PostMapping("")
    ApiResponse<?> create(@Valid @RequestBody BrandRequest request) {
        return ApiResponse.builder()
                .result(brandService.save(request))
                .build();
    }

    @DeleteMapping("/{id}")
    ApiResponse<Void> deleteById(@PathVariable(name = "id", required = true) String code) {
        brandService.deleteByCode(code);
        return ApiResponse.<Void>builder().build();
    }

}
