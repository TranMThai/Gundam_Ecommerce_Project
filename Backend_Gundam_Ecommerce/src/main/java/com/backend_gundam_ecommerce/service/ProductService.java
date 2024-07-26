package com.backend_gundam_ecommerce.service;

import com.backend_gundam_ecommerce.dto.request.ProductCreateRequest;
import com.backend_gundam_ecommerce.dto.request.ProductUpdateRequest;
import com.backend_gundam_ecommerce.dto.response.ProductResponse;

import java.util.List;

public interface ProductService {

    List<ProductResponse> findAll();

    ProductResponse findById(Integer id);

    ProductResponse create(ProductCreateRequest dto);

    ProductResponse update(ProductUpdateRequest dto);

    void deleteById(Integer id);

}
