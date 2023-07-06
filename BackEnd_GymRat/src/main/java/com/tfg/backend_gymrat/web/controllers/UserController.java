package com.tfg.backend_gymrat.web.controllers;

import com.tfg.backend_gymrat.domain.dto.UserCreationRequest;
import com.tfg.backend_gymrat.domain.service.UserService;
import com.tfg.backend_gymrat.persistence.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/create")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("")
    public ResponseEntity<Void> createUser(@RequestBody UserCreationRequest request){
        User user = new User(request.getEmail(),
                request.getPassword(),
                request.getGym_experiece(),
                request.getAge(),
                request.getHeight(),
                request.getWeight());

        try {
            userService.createUser(user);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}
