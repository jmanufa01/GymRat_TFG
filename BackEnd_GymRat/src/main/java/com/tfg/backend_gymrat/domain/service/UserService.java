package com.tfg.backend_gymrat.domain.service;

import com.tfg.backend_gymrat.constants.ErrorConstants;
import com.tfg.backend_gymrat.domain.dto.api.user.UserProfileDTO;
import com.tfg.backend_gymrat.domain.dto.entity.UserDTO;
import com.tfg.backend_gymrat.domain.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    public void createNewUser(UserDTO user){
        repository.createUser(user);
    }

    public List<UserDTO> findAllUsersInDB(){
        return repository.findAllUsers();
    }

    public boolean existsUserByUserName(String userName){
        return repository.existsUser(userName);
    }

    public UserDTO findUserByUsername(String userName){
        return repository.findByUserName(userName)
                .orElseThrow(() -> new UsernameNotFoundException(ErrorConstants.USERNAME_NOT_FOUND));
    }

    public UserProfileDTO obtainUserProfile(String userName){
        final var user = findUserByUsername(userName);
        return new UserProfileDTO(user.getUsername(), user.getEmail(), user.getGymExperience(), user.getBirthDate(), user.getHeight(), user.getWeight());
    }

}
