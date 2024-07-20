package com.backend_gundam_ecommerce.service;

import com.backend_gundam_ecommerce.dto.request.UserRequest;
import com.backend_gundam_ecommerce.dto.response.UserResponse;

import java.util.List;

public interface UserService {

    List<UserResponse> findAll();

    UserResponse findById(Integer id);

    UserResponse create(UserRequest dto);

    void deleteById(Integer id);

}
