package com.backend_gundam_ecommerce.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class ProductUpdateRequest {

    private Integer id;

    private String code;

    private String name;

    private Double price;

    private Integer quantity;

    private String description;

    private Boolean status;

    @JsonProperty("code_category")
    private String codeCategory;

    @JsonProperty("code_brand")
    private String codeBrand;

}
