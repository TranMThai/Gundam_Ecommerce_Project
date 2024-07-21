package com.backend_gundam_ecommerce.service;

import com.backend_gundam_ecommerce.common.dto.request.UserCreateRequest;
import com.backend_gundam_ecommerce.common.dto.response.UserResponse;

import java.util.List;

public interface UserService {

    List<UserResponse> findAll();

    UserResponse findById(Integer id);

    UserResponse create(UserCreateRequest dto);

    void deleteById(Integer id);

}
