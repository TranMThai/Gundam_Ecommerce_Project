package com.backend_gundam_ecommerce.service;

import com.backend_gundam_ecommerce.dto.response.BrandResponse;
import com.backend_gundam_ecommerce.entity.Image;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ImageService {

    List<Image> findAll();

    Image findById(Integer id);

    Image create(MultipartFile file, Integer id);
//
//    ProductResponse update(ProductUpdateRequest dto);
//
//    void deleteById(Integer id);

}
