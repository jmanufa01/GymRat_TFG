package com.tfg.backend_gymrat.web.controllers;


import com.tfg.backend_gymrat.domain.dto.api.user.response.UserNameDTO;
import com.tfg.backend_gymrat.domain.dto.api.user.response.UserProfileDTO;
import com.tfg.backend_gymrat.domain.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/v1/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping(params = "username")
    public ResponseEntity<List<UserNameDTO>> findAllUsersByUsernameContaining(@RequestParam String username) throws Exception {
        final var users = userService.findAllUsersByUsernameContaining(username);
        return ok(users);
    }
    @GetMapping("profile/{username}")
    public ResponseEntity<UserProfileDTO> obtainUserProfile(@PathVariable String username) throws Exception{
        final var profile = userService.obtainUserProfile(username);
        return ok(profile);
    }
}
