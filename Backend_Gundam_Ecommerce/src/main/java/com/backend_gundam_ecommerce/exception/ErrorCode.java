package com.backend_gundam_ecommerce.exception;

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
    USER_EXIST(400, "user existed", HttpStatus.BAD_REQUEST),
    UNAUTHENTICATED(400,"unauthenticated", HttpStatus.BAD_REQUEST),
    TOKEN_EXCEPTION(400,"token exception", HttpStatus.BAD_REQUEST)
    ;

    private final int code;

    private final String message;

    private final HttpStatusCode httpStatusCode;

}