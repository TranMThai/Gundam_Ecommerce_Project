package com.backend_gundam_ecommerce.mapper;

import com.backend_gundam_ecommerce.dto.request.UserCreateRequest;
import com.backend_gundam_ecommerce.dto.response.UserResponse;
import com.backend_gundam_ecommerce.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(source = "idRole", target = "role.id")
    User toEntity(UserCreateRequest dto);

    @Mapping(source = "role.name", target = "role")
    UserResponse toDto(User user);

}
