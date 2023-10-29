package com.tfg.backend_gymrat.web.controllers;

import com.tfg.backend_gymrat.constants.AppConstants;
import com.tfg.backend_gymrat.domain.dto.api.user.UserProfileDTO;
import com.tfg.backend_gymrat.domain.service.UserService;
import com.tfg.backend_gymrat.util.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/v1/users")
public class UserController {
    @Autowired
    private UserService userService;
    private final Log log = new Log();
    @GetMapping("profile/{username}")
    public ResponseEntity<UserProfileDTO> obtainUserProfile(@PathVariable String username){
        try{
            log.log(AppConstants.OBTAINING_PROFILE);
            final var profile = userService.obtainUserProfile(username);
            log.log(AppConstants.PROFILE_OBTAINMENT_SUCCESS);
            return ok(profile);
        }catch (Exception e){
            log.log(AppConstants.PROFILE_OBTAINMENT_FAILURE);
            throw e;
        }

    }
}
