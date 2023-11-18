package com.tfg.backend_gymrat.domain.service;

import com.tfg.backend_gymrat.constants.AppConstants;
import com.tfg.backend_gymrat.constants.ErrorConstants;
import com.tfg.backend_gymrat.domain.dto.api.user.response.UserNameDTO;
import com.tfg.backend_gymrat.domain.dto.api.user.response.UserProfileDTO;
import com.tfg.backend_gymrat.domain.dto.entity.UserDTO;
import com.tfg.backend_gymrat.domain.repository.UserRepository;
import com.tfg.backend_gymrat.persistence.mongo.UserMongo;
import com.tfg.backend_gymrat.util.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

import static com.tfg.backend_gymrat.exceptions.AppExceptions.*;
@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private UserMongo mongo;

    private final Log log = new Log();
    public void createNewUser(UserDTO user){
        repository.createUser(user);
    }

    public List<UserDTO> findAllUsersInDB(){
        return repository.findAllUsers();
    }

    public boolean existsUserByUserName(String userName){
        return repository.existsUser(userName);
    }

    public UserDTO findUserByUsername(String userName) throws Exception {
        return repository.findByUserName(userName)
                .orElseThrow(UserNotFoundException::new);
    }

    public UserProfileDTO obtainUserProfile(String userName) throws Exception {
            try{
                log.log(AppConstants.OBTAINING_PROFILE);
                final var user = findUserByUsername(userName);
                final var profile = new UserProfileDTO(
                        user.username(),
                        user.email(),
                        user.gymExperience(),
                        user.birthDate(),
                        user.height(),
                        user.weight());

                log.log(AppConstants.PROFILE_OBTAINMENT_SUCCESS);
                return profile;
            }catch (Exception e) {
                log.log("Error: " + e.getMessage());
                log.log(AppConstants.PROFILE_OBTAINMENT_FAILURE);
                throw e;
            }
    }

    public List<UserNameDTO> findAllUsersByUsernameContaining(String string){
        log.log(AppConstants.OBTAINING_USERS_CONTAINING);
        final var loggedUser = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        final var users = repository.findAllUsersByUsernameContaining(string).stream()
                .filter(user -> !Objects.equals(user.username(), loggedUser.getUsername()))
                .map(user -> new UserNameDTO(user.username())).toList();
        log.log(AppConstants.USERS_CONTAINING_OBTAINMENT_SUCCESS);
        return users;
    }


    public void addFriend(String loggedUsername, String friendUsername) throws UserNotFoundException {
        final var user = mongo.findUserByUsername(loggedUsername).orElseThrow(UserNotFoundException::new);
        user.getFriends().add(friendUsername);
        mongo.save(user);

    }


}
