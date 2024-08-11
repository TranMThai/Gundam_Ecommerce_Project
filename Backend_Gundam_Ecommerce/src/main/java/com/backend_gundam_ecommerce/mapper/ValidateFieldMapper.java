package com.backend_gundam_ecommerce.mapper;

import com.backend_gundam_ecommerce.dto.response.ValidateFieldResponse;
import org.springframework.validation.FieldError;

public class ValidateFieldMapper {

   public static ValidateFieldResponse toDto(FieldError error) {
        return ValidateFieldResponse.builder()
                .field(error.getField())
                .defaultMessage(error.getDefaultMessage())
                .build();
    }

}
