package com.backend_gundam_ecommerce.service.impl;

import com.backend_gundam_ecommerce.config.exception.AppException;
import com.backend_gundam_ecommerce.config.exception.ErrorCode;
import com.backend_gundam_ecommerce.dto.response.BrandResponse;
import com.backend_gundam_ecommerce.entity.Image;
import com.backend_gundam_ecommerce.entity.Product;
import com.backend_gundam_ecommerce.mapper.BrandMapper;
import com.backend_gundam_ecommerce.repository.ImageRepository;
import com.backend_gundam_ecommerce.service.ImageService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ImageServiceImpl implements ImageService {

    ImageRepository imageRepository;
    BrandMapper brandMapper;

    @Override
    public List<Image> findAll() {
        return imageRepository.findAll();
    }

    @Override
    public Image findById(Integer id) {
        return imageRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.NOT_FOUND));
    }

    @Override
    public Image create(MultipartFile file, Integer id) {
        String name = file.getOriginalFilename();
        return imageRepository.save(Image.builder()
                .url(name)
                .product(Product.builder()
                        .id(id)
                        .build())
                .build());
    }
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
