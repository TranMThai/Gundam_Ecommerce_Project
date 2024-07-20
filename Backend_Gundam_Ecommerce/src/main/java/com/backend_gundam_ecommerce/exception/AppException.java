package com.backend_gundam_ecommerce.exception;

import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class AppException extends RuntimeException {

    private ErrorCode errorCode;

    public AppException(ErrorCode errorCode){
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }

}
