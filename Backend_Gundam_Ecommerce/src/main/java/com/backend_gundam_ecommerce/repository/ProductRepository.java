package com.backend_gundam_ecommerce.repository;

import com.backend_gundam_ecommerce.entity.Product;
import com.backend_gundam_ecommerce.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    Optional<Product> findByCode(String code);

    @Query(value = "select p.* " +
            "from product p " +
            "where p.code like :search " +
            "or p.id = :search",
            nativeQuery = true
    )
    Optional<Product> findByIdOrCode(
            @Param("search") String search
    );

}
