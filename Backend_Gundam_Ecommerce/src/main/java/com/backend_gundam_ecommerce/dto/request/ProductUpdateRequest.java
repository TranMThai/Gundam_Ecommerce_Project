package com.backend_gundam_ecommerce.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class ProductUpdateRequest {

    @NotNull(message = "Id may not be null")
    private Integer id;

    @NotBlank(message = "Code may not be blank")
    private String code;

    @NotBlank(message = "Name may not be blank")
    private String name;

    @Positive(message = "Price must be positive")
    @NotNull(message = "Price may not be null")
    private Double price;

    @Positive(message = "Quantity must be positive")
    @NotNull(message = "Quantity may not be null")
    private Integer quantity;

    @NotBlank(message = "Code may not be blank")
    private String description;

    @NotBlank(message = "Code category may not be blank")
    private String codeCategory;

    @NotBlank(message = "Code brand may not be blank")
    private String codeBrand;

    @NotEmpty(message = "Image may not be empty")
    private List<MultipartFile> fileImages;

    @NotNull(message = "Status may not be null")
    private Boolean status;

}
