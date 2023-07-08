package com.tfg.backend_gymrat.web.controllers;

import com.tfg.backend_gymrat.domain.dto.api.auth.request.UserRegistrationRequest;
import com.tfg.backend_gymrat.domain.dto.api.auth.response.UserRegistrationResponse;
import com.tfg.backend_gymrat.domain.dto.entity.UserDTO;
import com.tfg.backend_gymrat.domain.service.AuthService;
import com.tfg.backend_gymrat.persistence.entity.Role;
import com.tfg.backend_gymrat.util.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.ResponseEntity.ok;
import static org.springframework.http.ResponseEntity.badRequest;

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
    public ResponseEntity<UserRegistrationResponse> register(@RequestBody UserRegistrationRequest request){
        try {

            //log.log(AuthConstants.REGISTRATION_IN_PROCCESS, request.userName());

            System.out.println(request.toString());


            UserDTO user = new UserDTO(request.username(),
                request.email(),
                request.password(),
                request.gym_experience(),
                request.age(),
                request.height(),
                request.weight(),
                    Role.USER);

            String jwt = authService.registerUser(user);
            System.out.println(jwt);
            //log.log(AuthConstants.REGISTRATION_SUCCESSFUL, request.userName());

            return ok(new UserRegistrationResponse(jwt));
        }catch (Exception e){
            //log.log(AuthConstants.REGISTRATION_FAILED, request.userName());
            return badRequest().body(null);  //TODO: Introduce error in body
        }
    }

}
