package com.backend_gundam_ecommerce.config.app;

import com.backend_gundam_ecommerce.common.enums.Roles;
import com.backend_gundam_ecommerce.entity.Role;
import com.backend_gundam_ecommerce.entity.User;
import com.backend_gundam_ecommerce.repository.RoleRepository;
import com.backend_gundam_ecommerce.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@Slf4j
public class AppInitConfig {

    @Value("${init.admin.isInsert}")
    Boolean isInsert;
    @Value("${init.admin.user}")
    String userName;
    @Value("${init.admin.password}")
    String password;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Bean
    ApplicationRunner applicationRunner(UserRepository userRepository,
                                        RoleRepository roleRepository) {
        return args -> {
            if(isInsert){

                boolean isUserAdminExist = userRepository.findByUsername(userName).isPresent();
                boolean isRoleAdminExist = roleRepository.findRoleByName(Roles.ADMIN.name()).isPresent();
                if (!isUserAdminExist && isRoleAdminExist) {
                    log.warn("Không tìm thấy tài khoản admin. Đang tiến hành tạo tài khoản admin");
                    Role role = roleRepository.findRoleByName(Roles.ADMIN.name()).get();
                    User admin = User.builder()
                            .username(userName)
                            .password(passwordEncoder.encode(password))
                            .role(role)
                            .build();
                    userRepository.save(admin);
                }
            }
        };
    }

}
