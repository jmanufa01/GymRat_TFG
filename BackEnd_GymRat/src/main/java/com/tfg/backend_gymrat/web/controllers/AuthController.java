package com.tfg.backend_gymrat.web.controllers;


import com.tfg.backend_gymrat.domain.dto.api.auth.request.UserLoginRequest;
import com.tfg.backend_gymrat.domain.dto.api.auth.request.UserRegistrationRequest;
import com.tfg.backend_gymrat.domain.dto.api.auth.response.AuthenticationResponse;
import com.tfg.backend_gymrat.domain.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import static org.springframework.http.ResponseEntity.ok;

/**
 *  Controller to route all the authentication operations related
 *
 */
@RestController
@RequestMapping("/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    /**
     *
     * Function to register an user in the db
     *
     * @param request
     * @return
     */
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody UserRegistrationRequest request) throws Exception {
                String jwt = authService.registerUser(request);
                return new ResponseEntity<>(new AuthenticationResponse(jwt), HttpStatus.CREATED);
    }

    /**
     * Function to authenticate a registered user
     *
     * @param request Login request (username and password)
     * @return returns the jwt token
     */
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody UserLoginRequest request) throws Exception {
            String token = authService.login(request.username(),request.password());
            return ok(new AuthenticationResponse(token));
    }

    @GetMapping("/check")
    public ResponseEntity<AuthenticationResponse> check(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorization) throws Exception {
        String jwt = authService.check(authorization);
        return ok(new AuthenticationResponse(jwt));
    }

}
