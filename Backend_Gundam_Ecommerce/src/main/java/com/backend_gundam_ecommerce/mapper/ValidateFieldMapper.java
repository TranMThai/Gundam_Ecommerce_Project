package com.backend_gundam_ecommerce.mapper;

import com.backend_gundam_ecommerce.dto.response.ValidateFieldResponse;
import org.springframework.validation.FieldError;

public class ValidateFieldMapper {

    public static ValidateFieldResponse toDto(FieldError error) {
        return ValidateFieldResponse.builder()
                .field(toSnakeCase(error.getField()))
                .defaultMessage(error.getDefaultMessage())
                .build();
    }

    private static String toSnakeCase(String field) {
        char[] array = field.toCharArray();
        StringBuilder builder = new StringBuilder();
        for (char c : array) {
            if (c >= 65 && c <= 90) {
                builder.append("_");
            }
            builder.append(c);
        }
        return builder.toString().toLowerCase();
    }

}
