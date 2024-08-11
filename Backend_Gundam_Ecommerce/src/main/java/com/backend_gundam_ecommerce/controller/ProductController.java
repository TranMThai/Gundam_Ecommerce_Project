package com.backend_gundam_ecommerce.controller;

import com.backend_gundam_ecommerce.dto.request.ProductCreateRequest;
import com.backend_gundam_ecommerce.dto.request.ProductUpdateRequest;
import com.backend_gundam_ecommerce.dto.response.ApiResponse;
import com.backend_gundam_ecommerce.mapper.ValidateFieldMapper;
import com.backend_gundam_ecommerce.service.ProductService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/products")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class ProductController {

    ProductService productService;

    @GetMapping("")
    ApiResponse<?> findAll() {
        return ApiResponse.builder()
                .result(productService.findAll())
                .build();
    }

    @GetMapping("/{id}")
    ApiResponse<?> findById(@PathVariable(name = "id", required = true) Integer id) {
        return ApiResponse.builder()
                .result(productService.findById(id))
                .build();
    }

    @PostMapping("")
    ApiResponse<?> create(
            @Valid @ModelAttribute ProductCreateRequest request,
            BindingResult result
    ) {
        if (result.hasErrors()) {
            var errors = result.getFieldErrors().stream()
                    .map(ValidateFieldMapper::toDto)
                    .toList();
            return ApiResponse.builder()
                    .code(HttpStatus.BAD_REQUEST.value())
                    .result(errors)
                    .build();
        }
        return ApiResponse.builder()
                .result(productService.create(request))
                .build();
    }

    @PutMapping("/update")
    ApiResponse<?> update(@Valid @ModelAttribute ProductUpdateRequest request) {
        return ApiResponse.builder()
                .result(productService.update(request))
                .build();
    }

    @PutMapping("/update_status/{id}")
    ApiResponse<?> updateStatus(@PathVariable("id") Integer id) {
        return ApiResponse.builder()
                .result(productService.updateStatus(id))
                .build();
    }


    @DeleteMapping("/{id}")
    ApiResponse<Void> deleteById(@PathVariable(name = "id", required = true) Integer id) {
        productService.deleteById(id);
        return ApiResponse.<Void>builder().build();
    }

}
