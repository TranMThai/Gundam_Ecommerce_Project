package com.backend_gundam_ecommerce.service.impl;

import com.backend_gundam_ecommerce.config.exception.AppException;
import com.backend_gundam_ecommerce.config.exception.ErrorCode;
import com.backend_gundam_ecommerce.dto.response.BrandResponse;
import com.backend_gundam_ecommerce.dto.response.CategoryResponse;
import com.backend_gundam_ecommerce.mapper.BrandMapper;
import com.backend_gundam_ecommerce.repository.BrandRepository;
import com.backend_gundam_ecommerce.service.BrandService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BrandServiceImpl implements BrandService {

    BrandRepository brandRepository;
    BrandMapper brandMapper;

    @Override
    public List<BrandResponse> findAll() {
        return brandRepository.findAll().stream()
                .map(brandMapper::toDto)
                .toList();
    }

    @Override
    public BrandResponse findById(String id) {
        return brandRepository.findById(id)
                .map(brandMapper::toDto)
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
