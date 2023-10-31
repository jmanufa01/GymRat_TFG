package com.tfg.backend_gymrat.domain.repository.impl;

import com.tfg.backend_gymrat.domain.dto.entity.UserDTO;
import com.tfg.backend_gymrat.domain.repository.UserRepository;
import com.tfg.backend_gymrat.persistence.entity.User;
import com.tfg.backend_gymrat.persistence.mapper.UserMapper;
import com.tfg.backend_gymrat.persistence.mongo.UserMongo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


/**
 *
 * User repository interface implementation
 *
 */
@Repository
public class UserRepositoryImpl implements UserRepository {

    @Autowired
    private UserMongo userMongo;

    @Autowired
    private UserMapper mapper;


    @Override
    public void createUser(UserDTO user) {
        userMongo.insert(mapper.toUser(user));
    }

    @Override
    public Optional<UserDTO> findByUserName(String userName) {
        return userMongo.findUserByUsername(userName).map(user -> mapper.toUserDTO(user));
    }

    @Override
    public boolean existsUser(String userName) {
        return userMongo.existsUserByUsername(userName);
    }

    @Override
    public List<UserDTO> findAllUsers() {
        return mapper.toUsersDTO(userMongo.findAll());
    }

    @Override
    public List<UserDTO> findAllUsersByUsernameContaining(String username) {
        return mapper.toUsersDTO(userMongo.findAllByUsernameContaining(username));
    }
}
