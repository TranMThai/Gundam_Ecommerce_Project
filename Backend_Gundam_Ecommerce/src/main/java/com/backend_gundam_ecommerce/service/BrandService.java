package com.backend_gundam_ecommerce.service;

import com.backend_gundam_ecommerce.dto.response.BrandResponse;
import com.backend_gundam_ecommerce.dto.response.CategoryResponse;

import java.util.List;

public interface BrandService {

    List<BrandResponse> findAll();

    BrandResponse findById(String id);

//    ProductResponse create(ProductCreateRequest dto);
//
//    ProductResponse update(ProductUpdateRequest dto);
//
//    void deleteById(Integer id);

}
