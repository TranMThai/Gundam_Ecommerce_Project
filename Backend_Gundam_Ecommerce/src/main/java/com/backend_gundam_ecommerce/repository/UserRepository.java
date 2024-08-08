package com.backend_gundam_ecommerce.repository;

import com.backend_gundam_ecommerce.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    boolean existsUsersByUsername(String username);

    Optional<User> findByUsername(String username);

    @Query(value = "SELECT u " +
            "FROM User u " +
            "WHERE u.email = :email " +
            "OR u.idGoogleAccount = :idGoogleAccount ")
    Optional<User> findByEmailOrIdGoogleAccount(
            @Param("email") String email,
            @Param("idGoogleAccount") String idGoogleAccount);

}
