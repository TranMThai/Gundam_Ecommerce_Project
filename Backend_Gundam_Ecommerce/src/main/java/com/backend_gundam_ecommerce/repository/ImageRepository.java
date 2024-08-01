package com.backend_gundam_ecommerce.repository;

import com.backend_gundam_ecommerce.entity.Brand;
import com.backend_gundam_ecommerce.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface ImageRepository extends JpaRepository<Image,Integer> {
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM Image i WHERE i.product.id = :id")
    void deleteAllByProductId(@Param("id") Integer id);
}
