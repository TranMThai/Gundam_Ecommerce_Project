package com.backend_gundam_ecommerce.config.security;

public class EndPoints {

    public static final String[] PUBLIC_ENDPOINTS = {
            "/images/**",
            "/auth/token",
            "/auth/introspect",
            "/api/users",
            "/api/users/*",
            "/api/products",
            "/api/products/**",
    };

}
