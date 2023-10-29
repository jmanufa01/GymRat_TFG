package com.tfg.backend_gymrat.web.controllers;

import com.tfg.backend_gymrat.domain.dto.entity.UserDTO;
import com.tfg.backend_gymrat.domain.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


import static org.springframework.http.ResponseEntity.ok;


@RestController
@RequestMapping("/v1/admin")
public class AdminController {

    @Autowired
    private UserService userService;


    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> getAllUsers(){
        return ok(userService.findAllUsersInDB());   //TODO: Improve this part (now are just tests)
    }
}
