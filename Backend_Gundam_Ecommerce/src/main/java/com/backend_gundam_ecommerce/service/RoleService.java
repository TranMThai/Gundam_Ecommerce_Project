package com.backend_gundam_ecommerce.service;

import com.backend_gundam_ecommerce.dto.request.RoleRequest;
import com.backend_gundam_ecommerce.dto.response.RoleResponse;
import com.backend_gundam_ecommerce.entity.Role;

import java.util.List;
import java.util.Optional;

public interface RoleService {

    List<RoleResponse> findAll();

    RoleResponse findById(Integer id);

    RoleResponse save(RoleRequest request);

    void deleteById(Integer id);

}
