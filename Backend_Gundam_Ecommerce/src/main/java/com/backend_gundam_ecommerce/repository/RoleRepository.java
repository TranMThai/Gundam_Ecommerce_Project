package com.backend_gundam_ecommerce.repository;

import com.backend_gundam_ecommerce.entity.Role;
import com.backend_gundam_ecommerce.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role,Integer> {
}
