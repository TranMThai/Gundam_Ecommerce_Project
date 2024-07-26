package com.backend_gundam_ecommerce.repository;

import com.backend_gundam_ecommerce.entity.Brand;
import com.backend_gundam_ecommerce.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository<Image,Integer> {
}
