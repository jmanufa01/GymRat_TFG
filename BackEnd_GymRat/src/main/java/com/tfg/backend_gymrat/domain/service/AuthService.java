package com.tfg.backend_gymrat.domain.service;

import com.tfg.backend_gymrat.constants.AuthConstants;
import com.tfg.backend_gymrat.domain.dto.api.auth.request.UserRegistrationRequest;
import com.tfg.backend_gymrat.domain.dto.entity.Role;
import com.tfg.backend_gymrat.domain.dto.entity.UserDTO;
import com.tfg.backend_gymrat.util.Log;
import com.tfg.backend_gymrat.util.UtilClass;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.tfg.backend_gymrat.exceptions.AppExceptions.*;


@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserService userService;

    private final JWTService jwtService;

    private final AuthenticationManager authenticationManager;

    private final PasswordEncoder passwordEncoder;
    private final Log log = new Log();


    public String registerUser(UserRegistrationRequest request) throws Exception {

        try {
            UserDTO user = new UserDTO(request.username(),
                    request.email(),
                    passwordEncoder.encode(request.password()),
                    request.gymExperience(),
                    request.birthDate(),
                    request.height(),
                    request.weight(),
                    Role.USER,
                    null);

            log.log(AuthConstants.REGISTRATION_IN_PROCCESS, user.username());
            if(user.email().trim().equals("")
                    || user.password().trim().equals("")
                    || user.username().trim().equals(""))
                throw new MissingRequestDataException();

            if(!UtilClass.isEmailValid(user.email()))
                throw new IncorrectRegistrationException();

            userService.createNewUser(user);
            final var token = jwtService.generateToken(user.username());
            log.log(AuthConstants.REGISTRATION_SUCCESSFUL, user.username());
            return token;
        }catch (Exception e) {
            log.log(AuthConstants.REGISTRATION_FAILED, request.username());
            throw e;
        }

    }


    public String login(String username, String password) throws Exception {
        try{
            log.log(AuthConstants.LOGIN_IN_PROCCESS, username);

            if(username.trim().equals("") || password.trim().equals("")){
                throw new MissingRequestDataException();
            }

            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            username,
                            password
                    )
            );

            final var token = jwtService.generateToken(username);
            log.log(AuthConstants.LOGIN_SUCCESSFUL, username);
            return token;
        }catch (Exception e){
            log.log(AuthConstants.LOGIN_FAILED, username);
            throw e;
        }

    }

    public String check(String authorization) throws Exception {
        String jwt = authorization.split(" ")[1];
        if(!jwtService.isTokenValid(jwt)){
            throw new ExpiredTokenException();
        }
        return jwt;
    }

}
