package com.tfg.backend_gymrat.domain.service;

import com.tfg.backend_gymrat.constants.ErrorConstants;
import com.tfg.backend_gymrat.domain.dto.entity.UserDTO;
import com.tfg.backend_gymrat.domain.dto.errors.IncorrectRegistrationException;
import com.tfg.backend_gymrat.util.UtilClass;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCrypt;
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


    public String login(String username, String password){
        UserDTO user = userService.findUserByUsername(username);
        if(!BCrypt.checkpw(password,user.getPassword())){
            throw new BadCredentialsException(ErrorConstants.BAD_CREDENTIALS);
        }

        return  jwtService.generateToken(username);
    }


}
