package com.tfg.backend_gymrat.domain.repository;

import com.tfg.backend_gymrat.domain.dto.entity.UserDTO;

import java.util.List;
import java.util.Optional;

public interface UserRepository {
    void createUser(UserDTO user);
    Optional<UserDTO> findByUserName(String userName);
    boolean existsUser(String userName);
    List<UserDTO> findAllUsers();
    List<UserDTO> findAllUsersByUsernameContaining(String username);
}
