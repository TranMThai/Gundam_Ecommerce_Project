package com.backend_gundam_ecommerce.repository;

import com.backend_gundam_ecommerce.entity.Role;
import com.backend_gundam_ecommerce.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role,Integer> {
    Optional<Role> findRoleByName(String name);
}
