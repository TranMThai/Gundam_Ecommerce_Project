package com.backend_gundam_ecommerce.service.impl;

import com.backend_gundam_ecommerce.common.utils.ImageUtils;
import com.backend_gundam_ecommerce.config.exception.AppException;
import com.backend_gundam_ecommerce.config.exception.ErrorCode;
import com.backend_gundam_ecommerce.dto.request.ProductCreateRequest;
import com.backend_gundam_ecommerce.dto.request.ProductUpdateRequest;
import com.backend_gundam_ecommerce.dto.response.ProductResponse;
import com.backend_gundam_ecommerce.entity.Image;
import com.backend_gundam_ecommerce.entity.Product;
import com.backend_gundam_ecommerce.mapper.ProductMapper;
import com.backend_gundam_ecommerce.repository.ProductRepository;
import com.backend_gundam_ecommerce.service.ImageService;
import com.backend_gundam_ecommerce.service.ProductService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProductServiceImpl implements ProductService {

    ProductRepository productRepository;
    ProductMapper productMapper;
    ImageService imageService;

    @Override
    public List<ProductResponse> findAll() {
        return productRepository.findAll().stream()
                .map(productMapper::toDto)
                .toList();
    }

    @Override
    public ProductResponse findById(Integer id) {
        return productRepository.findById(id)
                .map(productMapper::toDto)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_FOUND));
    }

    @Override
    public ProductResponse create(ProductCreateRequest request) {

        Product entity = productMapper.toEntity(request);
        entity.setImages(new ArrayList<>());
        entity.setStatus(true);
        Product productSave = productRepository.save(entity);

        List<Image> imageList = saveImage(request.getFileImages(), productSave.getId());

        productSave.setImages(request.getFileImages().stream()
                .map(file -> Image.builder()
                        .url(file.getOriginalFilename())
                        .build())
                .toList());

        ProductResponse response = productMapper.toDto(productSave);
        return response;
    }

    @Override
    public ProductResponse update(ProductUpdateRequest request) {

        Product productEntity = productRepository.findById(request.getId())
                .orElseThrow(() -> new AppException(ErrorCode.NOT_FOUND));

        Product entity = productMapper.toEntity(request);

        imageService.deleteByProductId(productEntity.getId());

        List<Image> imageList = saveImage(request.getFileImages(), request.getId());

        entity.setImages(imageList);
        entity.setBillDetails(productEntity.getBillDetails());
        entity.setCarts(productEntity.getCarts());

        Product productSave = productRepository.save(entity);
        ProductResponse response = productMapper.toDto(productSave);
        return response;
    }

    @Override
    public ProductResponse updateStatus(Integer id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_FOUND));
        product.setStatus(!product.getStatus());
        Product entity = productRepository.save(product);
        ProductResponse response = productMapper.toDto(entity);
        return response;
    }

    @Override
    public void deleteById(Integer id) {
        productRepository.deleteById(id);
    }

    private List<Image> saveImage(List<MultipartFile> files, Integer id) {
        return files.stream()
                .map(file -> {
                    ImageUtils.save(file);
                    return imageService.create(file, id);
                })
                .toList();
    }
}
