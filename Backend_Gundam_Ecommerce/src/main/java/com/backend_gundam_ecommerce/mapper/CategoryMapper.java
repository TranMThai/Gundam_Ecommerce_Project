package com.backend_gundam_ecommerce.mapper;

import com.backend_gundam_ecommerce.dto.request.CategoryRequest;
import com.backend_gundam_ecommerce.dto.response.CategoryResponse;
import com.backend_gundam_ecommerce.entity.Category;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    CategoryResponse toDto(Category entity);
    Category toEntity(CategoryRequest request);
}
