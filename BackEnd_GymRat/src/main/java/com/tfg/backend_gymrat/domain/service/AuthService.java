package com.tfg.backend_gymrat.domain.service;

import com.tfg.backend_gymrat.constants.AuthConstants;
import com.tfg.backend_gymrat.domain.dto.entity.Role;
import com.tfg.backend_gymrat.domain.dto.entity.UserDTO;
import com.tfg.backend_gymrat.persistence.repository.UserRepository;
import com.tfg.backend_gymrat.util.Log;
import com.tfg.backend_gymrat.util.UtilClass;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import static com.tfg.backend_gymrat.exceptions.AppExceptions.*;


@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final UserService userService;
    private final JWTService jwtService;
    private final AuthenticationManager authenticationManager;
    private final Log log = new Log();


    public String registerUser(UserDTO userDTO) throws Exception {

        try {

            log.log(AuthConstants.REGISTRATION_IN_PROCCESS, userDTO.username());
            if(userDTO.email().trim().equals("")
                    || userDTO.password().trim().equals("")
                    || userDTO.username().trim().equals(""))
                throw new MissingRequestDataException();

            if(!UtilClass.isEmailValid(userDTO.email()))
                throw new IncorrectRegistrationException();

            final var user = userService.createNewUser(userDTO);

            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            user.getUsername(),
                            userDTO.password(),
                            user.getAuthorities()
                    )
            );

            final var token = jwtService.generateToken(user.getUsername());
            log.log(AuthConstants.REGISTRATION_SUCCESSFUL, user.getUsername());
            return token;
        }catch (Exception e) {
            log.log(AuthConstants.REGISTRATION_FAILED, userDTO.username());
            throw e;
        }

    }


    public String login(String username, String password) throws Exception {
        try{
            log.log(AuthConstants.LOGIN_IN_PROCCESS, username);

            if(username.trim().equals("") || password.trim().equals("")){
                throw new MissingRequestDataException();
            }

            final var user = userRepository.findUserByUsername(username).orElseThrow(UserNotFoundException::new);

            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            username,
                            password,
                            user.getAuthorities()
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
