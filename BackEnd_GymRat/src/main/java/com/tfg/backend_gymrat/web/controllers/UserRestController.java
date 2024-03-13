package com.tfg.backend_gymrat.web.controllers;


import com.tfg.backend_gymrat.domain.dto.api.user.response.UserNameDTO;
import com.tfg.backend_gymrat.domain.dto.api.user.response.UserProfileDTO;
import com.tfg.backend_gymrat.domain.dto.entity.UserDTO;
import com.tfg.backend_gymrat.domain.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("users")
@RequiredArgsConstructor
public class UserRestController {

    private final UserService userService;

    @GetMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<UserDTO>> obtainAllUsers() throws Exception {
        return ok(userService.findAllUsersInDB());
    }

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

    @GetMapping("friends")
    public ResponseEntity<List<UserNameDTO>> obtainFriends() throws Exception{
        final var friends = userService.findAllFriends();
        return ok(friends);
    }


    @GetMapping(value = "friends", params = "routineId")
    public ResponseEntity<List<UserNameDTO>> obtainFriendsByRoutineId(@RequestParam String routineId) throws Exception{
        final var friends = userService.findAllFriendsNotHavingRoutine(routineId);
        return ok(friends);
    }

    @DeleteMapping(value = "friends", params = "friendUsername")
    public ResponseEntity<Void> deleteFriend(@RequestParam String friendUsername) throws Exception{
        userService.deleteFriend(friendUsername);
        return ok().build();
    }

    @DeleteMapping("{username}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Void> deleteUser(@PathVariable String username) throws Exception {
        userService.deleteUser(username);
        return ok().build();
    }
}
