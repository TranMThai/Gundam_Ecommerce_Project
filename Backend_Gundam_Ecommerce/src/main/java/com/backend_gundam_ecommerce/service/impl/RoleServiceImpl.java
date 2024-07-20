package com.backend_gundam_ecommerce.service.impl;

import com.backend_gundam_ecommerce.dto.request.RoleRequest;
import com.backend_gundam_ecommerce.dto.response.RoleResponse;
import com.backend_gundam_ecommerce.entity.Role;
import com.backend_gundam_ecommerce.exception.AppException;
import com.backend_gundam_ecommerce.exception.ErrorCode;
import com.backend_gundam_ecommerce.mapper.RoleMapper;
import com.backend_gundam_ecommerce.repository.RoleRepository;
import com.backend_gundam_ecommerce.service.RoleService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RoleServiceImpl implements RoleService {

    RoleRepository roleRepository;
    RoleMapper roleMapper;

    @Override
    public List<RoleResponse> findAll() {
        return roleRepository.findAll().stream()
                .map(roleMapper::toDto)
                .toList();
    }

    @Override
    public RoleResponse findById(Integer id) {
        return roleRepository.findById(id)
                .map(roleMapper::toDto)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_FOUND));
    }

    @Override
    public RoleResponse save(RoleRequest request) {
        Role entity = roleMapper.toEntity(request);
        Role roleSave = roleRepository.save(entity);
        RoleResponse response = roleMapper.toDto(roleSave);
        return response;
    }

    @Override
    public void deleteById(Integer id) {
        roleRepository.deleteById(id);
    }
}
