package com.tfg.backend_gymrat.web.controllers;

import com.tfg.backend_gymrat.constants.AuthConstants;
import com.tfg.backend_gymrat.domain.dto.api.auth.request.UserLoginRequest;
import com.tfg.backend_gymrat.domain.dto.api.auth.request.UserRegistrationRequest;
import com.tfg.backend_gymrat.domain.dto.api.auth.response.AuthenticationResponse;
import com.tfg.backend_gymrat.domain.dto.entity.Role;
import com.tfg.backend_gymrat.domain.dto.entity.UserDTO;
import com.tfg.backend_gymrat.domain.service.AuthService;
import com.tfg.backend_gymrat.util.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


import static org.springframework.http.ResponseEntity.ok;

/**
 *  Controller to route all the authentication operations related
 *
 */
@RestController
@RequestMapping("/v1/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private AuthService authService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    private final Log log = new Log();

    /**
     *
     * Function to register an user in the db
     *
     * @param request
     * @return
     */
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody UserRegistrationRequest request) throws Exception {
            try{
                log.log(AuthConstants.REGISTRATION_IN_PROCCESS, request.username());

                UserDTO user = new UserDTO(request.username(),
                        request.email(),
                        passwordEncoder.encode(request.password()),
                        request.gym_experience(),
                        request.age(),
                        request.height(),
                        request.weight(),
                        Role.USER);

                String jwt = authService.registerUser(user);
                log.log(AuthConstants.REGISTRATION_SUCCESSFUL, request.username());

                return ok(new AuthenticationResponse(jwt));
            } catch (Exception e){
                log.log(AuthConstants.REGISTRATION_FAILED, request.username());
                throw e;
            }

    }

    /**
     * Function to authenticate a registered user
     *
     * @param request Login request (username and password)
     * @return returns the jwt token
     */
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody UserLoginRequest request) throws Exception {

        try {

            log.log(AuthConstants.LOGIN_IN_PROCCESS, request.username());

            String jwt = authService.login(request.username(),request.password());

            log.log(AuthConstants.LOGIN_SUCCESSFUL, request.username());

            return ok(new AuthenticationResponse(jwt));
        }catch (Exception e){
            log.log(AuthConstants.LOGIN_FAILED, request.username());
            throw e;
        }

    }

    @GetMapping("/check")
    public ResponseEntity<AuthenticationResponse> check(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorization) throws Exception {
        String jwt = authService.check(authorization);
        return ok(new AuthenticationResponse(jwt));
    }

}
