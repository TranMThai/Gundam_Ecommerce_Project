package com.backend_gundam_ecommerce.service;

import com.backend_gundam_ecommerce.dto.request.BrandRequest;
import com.backend_gundam_ecommerce.dto.request.CategoryRequest;
import com.backend_gundam_ecommerce.dto.response.BrandResponse;
import com.backend_gundam_ecommerce.dto.response.CategoryResponse;

import java.util.List;

public interface BrandService {

    List<BrandResponse> findAll();

    BrandResponse findById(String id);

    BrandResponse save(BrandRequest dto);

    void deleteByCode(String code);

}
