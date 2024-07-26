package com.backend_gundam_ecommerce.service.impl;

import com.backend_gundam_ecommerce.config.exception.AppException;
import com.backend_gundam_ecommerce.config.exception.ErrorCode;
import com.backend_gundam_ecommerce.dto.response.CategoryResponse;
import com.backend_gundam_ecommerce.mapper.CategoryMapper;
import com.backend_gundam_ecommerce.repository.CategoryRepository;
import com.backend_gundam_ecommerce.service.CategoryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CategoryServiceImpl implements CategoryService {

    CategoryRepository categoryRepository;
    CategoryMapper categoryMapper;

    @Override
    public List<CategoryResponse> findAll() {
        return categoryRepository.findAll().stream()
                .map(categoryMapper::toDto)
                .toList();
    }

    @Override
    public CategoryResponse findById(String id) {
        return categoryRepository.findById(id)
                .map(categoryMapper::toDto)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_FOUND));
    }

//    @Override
//    public ProductResponse create(ProductCreateRequest request) {
//        Product entity = productMapper.toEntity(request);
//        entity.setStatus(true);
//        Product roleSave = productRepository.save(entity);
//        ProductResponse response = productMapper.toDto(roleSave);
//        return response;
//    }
//
//    @Override
//    public ProductResponse update(ProductUpdateRequest request) {
//        Product entity = productMapper.toEntity(request);
//        Product roleSave = productRepository.save(entity);
//        ProductResponse response = productMapper.toDto(roleSave);
//        return response;
//    }
//
//    @Override
//    public void deleteById(Integer id) {
//        productRepository.deleteById(id);
//    }
}
