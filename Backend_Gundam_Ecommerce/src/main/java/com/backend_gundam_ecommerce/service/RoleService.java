package com.backend_gundam_ecommerce.service;

import com.backend_gundam_ecommerce.common.dto.request.RoleRequest;
import com.backend_gundam_ecommerce.common.dto.response.RoleResponse;

import java.util.List;

public interface RoleService {

    List<RoleResponse> findAll();

    RoleResponse findById(Integer id);

    RoleResponse save(RoleRequest request);

    void deleteById(Integer id);

}
