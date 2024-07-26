package com.backend_gundam_ecommerce.dto.response;

import com.backend_gundam_ecommerce.entity.Brand;
import com.backend_gundam_ecommerce.entity.Category;
import com.backend_gundam_ecommerce.entity.Image;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProductResponse {

    private Integer id;

    private String code;

    private String name;

    private Double price;

    private Integer quantity;

    private String description;

    private Boolean status;

    private Category category;

    private Brand brand;

    private List<String> images;

}
