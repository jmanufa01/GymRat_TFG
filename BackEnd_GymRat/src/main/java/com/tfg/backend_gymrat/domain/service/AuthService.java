package com.tfg.backend_gymrat.domain.service;

import com.tfg.backend_gymrat.domain.repository.UserRepository;
import com.tfg.backend_gymrat.domain.dto.errors.IncorrectRegistrationException;
import com.tfg.backend_gymrat.persistence.entity.User;
import com.tfg.backend_gymrat.util.UtilClass;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository repository;

    public void registerUser(User user) throws Exception{

        if(!UtilClass.isEmailValid(user.getEmail())){
            throw new IncorrectRegistrationException();
        }

        repository.createUser(user);
    }

    public boolean existsUserByUserName(String userName){
        return repository.existsUser(userName);
    }
}
