package com.tfg.backend_gymrat.domain.service;

import com.tfg.backend_gymrat.constants.ErrorConstants;
import com.tfg.backend_gymrat.domain.dto.entity.UserDTO;
import com.tfg.backend_gymrat.exceptions.IncorrectRegistrationException;
import com.tfg.backend_gymrat.util.UtilClass;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.MissingRequestValueException;

@Service
public class AuthService {

    @Autowired
    private UserService userService;

    @Autowired
    private JWTService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    public String registerUser(UserDTO user) throws Exception{

        if(user.getEmail().trim().equals("")
                || user.getPassword().trim().equals("")
                || user.getUsername().trim().equals(""))
            throw new MissingRequestValueException("Missing data");

        if(UtilClass.isEmailValid(user.getEmail()))
            throw new IncorrectRegistrationException();

        userService.createNewUser(user);
        return jwtService.generateToken(user.getUsername());
    }


    public String login(String username, String password) throws Exception {

        if(username.trim().equals("") || password.trim().equals("")){
            throw new MissingRequestValueException(ErrorConstants.MISSING_REQUEST_VALUES);
        }

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        username,
                        password
                )
        );

        return jwtService.generateToken(username);
    }


}
