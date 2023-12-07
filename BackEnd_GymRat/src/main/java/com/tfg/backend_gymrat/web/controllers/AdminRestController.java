package com.tfg.backend_gymrat.web.controllers;

import com.tfg.backend_gymrat.domain.dto.entity.UserDTO;
import com.tfg.backend_gymrat.domain.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


import static org.springframework.http.ResponseEntity.ok;


@RestController
@RequestMapping("v1/admin")
@RequiredArgsConstructor
public class AdminRestController {

    private final UserService userService;

    @GetMapping("users")
    public ResponseEntity<List<UserDTO>> getAllUsers(){
        return ok(userService.findAllUsersInDB());   //TODO: Improve this part (now are just tests)
    }
}
