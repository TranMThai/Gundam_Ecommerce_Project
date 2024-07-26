package com.backend_gundam_ecommerce.controller;

import com.backend_gundam_ecommerce.dto.request.ProductCreateRequest;
import com.backend_gundam_ecommerce.dto.response.ApiResponse;
import com.backend_gundam_ecommerce.service.CategoryService;
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
@RequestMapping("/api/categories")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class CategoryController {

    CategoryService categoryService;

    @GetMapping("")
    ApiResponse<?> findAll() {
        return ApiResponse.builder()
                .result(categoryService.findAll())
                .build();
    }

    @GetMapping("/{code}")
    ApiResponse<?> findById(@PathVariable(name = "code", required = true) String code) {
        return ApiResponse.builder()
                .result(categoryService.findById(code))
                .build();
    }

//    @PostMapping("")
//    ApiResponse<?> create(@Valid @RequestBody ProductCreateRequest request) {
//        return ApiResponse.builder()
//                .result(categoryService.create(request))
//                .build();
//    }
//
//    @DeleteMapping("/{id}")
//    ApiResponse<Void> deleteById(@PathVariable(name = "id", required = true) Integer id) {
//        categoryService.deleteById(id);
//        return ApiResponse.<Void>builder().build();
//    }

}
