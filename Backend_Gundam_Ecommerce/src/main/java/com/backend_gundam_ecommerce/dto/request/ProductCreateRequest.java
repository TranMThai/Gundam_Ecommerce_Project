package com.backend_gundam_ecommerce.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class ProductCreateRequest {

    private String code;

    private String name;

    private Double price;

    private Integer quantity;

    private String description;

    private String codeCategory;

    private String codeBrand;

    private List<MultipartFile> fileImages;

}
