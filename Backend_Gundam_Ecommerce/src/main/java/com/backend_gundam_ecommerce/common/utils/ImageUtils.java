package com.backend_gundam_ecommerce.common.utils;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class ImageUtils {

    private final static Path imagesPath = Paths.get("./images");

    public static void save(MultipartFile file) {
        if (!file.isEmpty()) {
            try {
                if (!Files.exists(imagesPath)) {
                    Files.createDirectories(imagesPath);
                }
                byte[] bytes = file.getBytes();
                Path path = imagesPath.resolve(file.getOriginalFilename());
                Files.write(path,bytes);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    public static ResponseEntity<Resource> load(String name) {
        try {
            Path file = imagesPath.resolve(name);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                String contentType = "image/jpeg";
                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(contentType))
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                throw new RuntimeException("Hông đọc đc");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

}
