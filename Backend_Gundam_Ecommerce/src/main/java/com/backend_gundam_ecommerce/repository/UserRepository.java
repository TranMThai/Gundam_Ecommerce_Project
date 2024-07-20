package com.backend_gundam_ecommerce.repository;

import com.backend_gundam_ecommerce.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {

    boolean existsUsersByUsername(String username);

    Optional<User> findByUsername(String username);

}
