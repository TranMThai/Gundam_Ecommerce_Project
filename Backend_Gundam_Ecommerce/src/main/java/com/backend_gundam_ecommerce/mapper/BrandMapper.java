package com.backend_gundam_ecommerce.mapper;

import com.backend_gundam_ecommerce.dto.request.BrandRequest;
import com.backend_gundam_ecommerce.dto.request.CategoryRequest;
import com.backend_gundam_ecommerce.dto.response.BrandResponse;
import com.backend_gundam_ecommerce.dto.response.CategoryResponse;
import com.backend_gundam_ecommerce.entity.Brand;
import com.backend_gundam_ecommerce.entity.Category;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BrandMapper {
    BrandResponse toDto(Brand entity);
    Brand toEntity(BrandRequest request);
}
