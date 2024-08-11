package com.backend_gundam_ecommerce.dto.request;

import com.backend_gundam_ecommerce.config.exception.ErrorCode;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class ProductCreateRequest {

    @NotBlank(message = "INVALID_CODE")
    private String code;

    @NotBlank(message = "INVALID_NAME")
    private String name;

    @Positive(message = "INVALID_PRICE")
    @NotNull(message = "INVALID_PRICE")
    private Double price;

    @Positive(message = "INVALID_QUANTITY")
    @NotNull(message = "INVALID_QUANTITY")
    private Integer quantity;

    @NotBlank(message = "INVALID_DESCRIPTION")
    private String description;

    @NotBlank(message = "INVALID_CATEGORY_CODE")
    private String codeCategory;

    @NotBlank(message = "INVALID_BRAND_CODE")
    private String codeBrand;

    @NotEmpty(message = "INVALID_IMAGES")
    private List<MultipartFile> images;

}
