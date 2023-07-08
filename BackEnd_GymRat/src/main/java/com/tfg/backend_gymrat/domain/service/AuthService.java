package com.tfg.backend_gymrat.domain.service;

import com.tfg.backend_gymrat.domain.dto.entity.UserDTO;
import com.tfg.backend_gymrat.domain.dto.errors.IncorrectRegistrationException;
import com.tfg.backend_gymrat.util.UtilClass;
import com.tfg.backend_gymrat.web.security.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserService userService;

    @Autowired
    private JWTService jwtService;

    public String registerUser(UserDTO user) throws Exception{

        if(!UtilClass.isEmailValid(user.getEmail())){
            throw new IncorrectRegistrationException();
        }

        userService.createNewUser(user);
        return jwtService.generateToken(user.getUsername());
    }


}
