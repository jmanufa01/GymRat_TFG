package com.tfg.backend_gymrat.domain.service;

import com.tfg.backend_gymrat.constants.AppConstants;
import com.tfg.backend_gymrat.domain.dto.api.user.response.UserNameDTO;
import com.tfg.backend_gymrat.domain.dto.api.user.response.UserProfileDTO;
import com.tfg.backend_gymrat.domain.dto.entity.UserDTO;
import com.tfg.backend_gymrat.persistence.entity.User;
import com.tfg.backend_gymrat.persistence.mapper.UserMapper;
import com.tfg.backend_gymrat.persistence.mongo.NotificationMongo;
import com.tfg.backend_gymrat.persistence.mongo.RoutineMongo;
import com.tfg.backend_gymrat.persistence.mongo.UserMongo;
import com.tfg.backend_gymrat.util.Log;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

import static com.tfg.backend_gymrat.exceptions.AppExceptions.*;
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserMongo repository;

    private final UserMapper mapper;

    private final NotificationMongo notificationRepository;

    private final RoutineMongo routineRepository;

    private final Log log = new Log();
    public List<UserDTO> findAllUsersInDB(){
        return mapper.toUserDTOs(repository.findAll());
    }

    public boolean existsUserByUserName(String userName){
        return repository.existsUserByUsername(userName);
    }

    public UserDTO findUserByUsername(String userName) throws Exception {
        return mapper.toUserDTO(repository.findUserByUsername(userName)
                .orElseThrow(UserNotFoundException::new));
    }

    public List<UserNameDTO> findAllUsersByUsernameContaining(String string) throws Exception {
        log.log(AppConstants.OBTAINING_USERS_CONTAINING);
        final var userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        final var loggedUser = findUserByUsername(userDetails.getUsername());
        final var friendsList = loggedUser.friends() != null ? loggedUser.friends() : List.of();
        final var users = repository.findAllByUsernameContaining(string).stream()
                .filter(user -> !Objects.equals(user.getUsername(), loggedUser.username())
                        && !notificationRepository.existsNotificationBySenderAndReceiver(loggedUser.username(), user.getUsername())
                        && !notificationRepository.existsNotificationByReceiverAndSender(loggedUser.username(), user.getUsername())
                        && !friendsList.contains(user.getUsername()))
                .map(user -> new UserNameDTO(user.getUsername())).toList();
        log.log(AppConstants.USERS_CONTAINING_OBTAINMENT_SUCCESS);
        return users;
    }

    public List<UserNameDTO> findAllFriendsNotHavingRoutine(String routineId) throws Exception {
        try{
            log.log(AppConstants.OBTAINING_FRIENDS_WITHOUT_ROUTINE);
            final var routine = routineRepository.findById(routineId).orElseThrow(RoutineNotFoundException::new);
            final var userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            final var loggedUser = findUserByUsername(userDetails.getUsername());
            List<String> friendsList = loggedUser.friends() != null ? loggedUser.friends() : List.of();
            return friendsList.stream()
                    .filter(friend -> !routine.getUsers().contains(friend))
                    .map(UserNameDTO::new)
                    .toList();
        }catch (Exception e) {
            log.log("Error: " + e.getMessage());
            log.log(AppConstants.OBTAINING_FRIENDS_WITHOUT_ROUTINE_FAILURE);
            throw e;
        }
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

    public void createNewUser(UserDTO userDTO){
        //TODO: insert validations

        final var user = User.builder()
                .username(userDTO.username())
                .email(userDTO.email())
                .password(userDTO.password())
                .gym_experience(userDTO.gymExperience())
                .birth_date(userDTO.birthDate())
                .height(userDTO.height())
                .weight(userDTO.weight())
                .role(userDTO.role().name())
                .friends(userDTO.friends())
                .build();

        repository.insert(user);
    }

}
