package com.backend_gundam_ecommerce.config.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    NOT_FOUND(404, "not found", HttpStatus.NOT_FOUND),
    INVALID(400, "invalid", HttpStatus.BAD_REQUEST),
    INVALID_NAME(400,"invlid name", HttpStatus.BAD_REQUEST),
    INVALID_KEY(400,"invalid key",HttpStatus.BAD_REQUEST),
    INVALID_ID(400,"invalid id",HttpStatus.BAD_REQUEST),
    INVALID_CODE(400,"invalid code",HttpStatus.BAD_REQUEST),
    INVALID_PRICE(400,"invalid price",HttpStatus.BAD_REQUEST),
    INVALID_QUANTITY(400,"invalid quantity",HttpStatus.BAD_REQUEST),
    INVALID_DESCRIPTION(400,"invalid description",HttpStatus.BAD_REQUEST),
    INVALID_CATEGORY_CODE(400,"invalid category code",HttpStatus.BAD_REQUEST),
    INVALID_BRAND_CODE(400,"invalid brand code",HttpStatus.BAD_REQUEST),
    INVALID_IMAGES(400,"invalid images",HttpStatus.BAD_REQUEST),
    USER_EXIST(400, "user existed", HttpStatus.BAD_REQUEST),
    UNAUTHENTICATED(400,"unauthenticated", HttpStatus.BAD_REQUEST),
    TOKEN_EXCEPTION(400,"token exception", HttpStatus.BAD_REQUEST),
    RUNTIME_EXCEPTION(400,"runtime exception", HttpStatus.BAD_REQUEST),
    SQL_EXCEPTION(400,"invalid sql exception", HttpStatus.BAD_REQUEST)
    ;

    private final int code;

    private final String message;

    private final HttpStatusCode httpStatusCode;

}