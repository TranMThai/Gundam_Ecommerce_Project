package com.backend_gundam_ecommerce.service;

import com.backend_gundam_ecommerce.dto.request.ProductCreateRequest;
import com.backend_gundam_ecommerce.dto.request.ProductUpdateRequest;
import com.backend_gundam_ecommerce.dto.response.CategoryResponse;
import com.backend_gundam_ecommerce.dto.response.ProductResponse;

import java.util.List;

public interface CategoryService {

    List<CategoryResponse> findAll();

    CategoryResponse findById(String id);

//    ProductResponse create(ProductCreateRequest dto);
//
//    ProductResponse update(ProductUpdateRequest dto);
//
//    void deleteById(Integer id);

}
