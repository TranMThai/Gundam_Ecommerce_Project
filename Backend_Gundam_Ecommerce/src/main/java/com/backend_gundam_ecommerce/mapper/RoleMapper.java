package com.backend_gundam_ecommerce.mapper;

import com.backend_gundam_ecommerce.dto.request.RoleRequest;
import com.backend_gundam_ecommerce.dto.response.RoleResponse;
import com.backend_gundam_ecommerce.entity.Role;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RoleMapper {

    RoleResponse toDto(Role role);

    Role toEntity(RoleRequest request);
}
