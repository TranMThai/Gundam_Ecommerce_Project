package com.backend_gundam_ecommerce;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients
@SpringBootApplication
public class BackendGundamEcommerceApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendGundamEcommerceApplication.class, args);
    }

}
