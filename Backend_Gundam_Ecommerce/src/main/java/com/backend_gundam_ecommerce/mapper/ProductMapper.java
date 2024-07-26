package com.backend_gundam_ecommerce.mapper;

import com.backend_gundam_ecommerce.dto.request.ProductCreateRequest;
import com.backend_gundam_ecommerce.dto.request.ProductUpdateRequest;
import com.backend_gundam_ecommerce.dto.response.ProductResponse;
import com.backend_gundam_ecommerce.entity.Image;
import com.backend_gundam_ecommerce.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    @Mapping(source = "images", target = "images", qualifiedByName = "mapImages")
    ProductResponse toDto(Product entity);

    @Mapping(source = "codeCategory", target = "category.code")
    @Mapping(source = "codeBrand", target = "brand.code")
    Product toEntity(ProductCreateRequest request);

    @Mapping(source = "codeCategory", target = "category.code")
    @Mapping(source = "codeBrand", target = "brand.code")
    Product toEntity(ProductUpdateRequest request);

    @Named("mapImages")
    static List<String> mapImages(List<Image> images) {
        return images.stream()
                .map(Image::getUrl)
                .collect(Collectors.toList());
    }
}
