package com.tfg.backend_gymrat.web.controllers;

import com.tfg.backend_gymrat.constants.AuthConstants;
import com.tfg.backend_gymrat.constants.ErrorConstants;
import com.tfg.backend_gymrat.domain.dto.api.auth.request.UserLoginRequest;
import com.tfg.backend_gymrat.domain.dto.api.auth.request.UserRegistrationRequest;
import com.tfg.backend_gymrat.domain.dto.api.auth.response.AuthenticationResponse;
import com.tfg.backend_gymrat.domain.dto.entity.UserDTO;
import com.tfg.backend_gymrat.domain.service.AuthService;
import com.tfg.backend_gymrat.persistence.entity.Role;
import com.tfg.backend_gymrat.util.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.MissingRequestValueException;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.ResponseEntity.ok;
import static org.springframework.http.ResponseEntity.badRequest;
import static org.springframework.http.ResponseEntity.notFound;

/**
 *  Controller to route all the authentication operations related
 *
 */
@RestController
@RequestMapping("/v1/auth")
public class AuthController {

    @Autowired
    private AuthService authService;


    private final Log log = new Log();

    /**
     *
     * Function to register an user in the db
     *
     * @param request
     * @return
     */
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody UserRegistrationRequest request){
        try {

            log.log(AuthConstants.REGISTRATION_IN_PROCCESS, request.username());

            UserDTO user = new UserDTO(request.username(),
                request.email(),
                BCrypt.hashpw(request.password(),BCrypt.gensalt(10)),
                request.gym_experience(),
                request.age(),
                request.height(),
                request.weight(),
                    Role.USER);

            String jwt = authService.registerUser(user);
            System.out.println(jwt);
            log.log(AuthConstants.REGISTRATION_SUCCESSFUL, request.username());

            return ok(new AuthenticationResponse(jwt));
        }catch (Exception e){
            //log.log(AuthConstants.REGISTRATION_FAILED, request.userName());
            return badRequest().body(null);  //TODO: Introduce error in body
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody UserLoginRequest request){
        try{
            if(request.username() == null || request.password() == null){
                throw new MissingRequestValueException(ErrorConstants.MISSING_REQUEST_VALUES);
            }

            String jwt = authService.login(request.username(),request.password());
            return ok(new AuthenticationResponse(jwt));
        } catch (UsernameNotFoundException unfe){
            log.log(AuthConstants.LOGIN_FAILED, request.username());
            return notFound().build();
        } catch (Exception e){
            log.log(AuthConstants.LOGIN_FAILED, request.username());
            return badRequest().body(null);  //TODO: Introduce error in body
        }
    }

}
