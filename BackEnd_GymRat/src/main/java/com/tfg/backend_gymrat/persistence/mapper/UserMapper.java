package com.tfg.backend_gymrat.persistence.mapper;


import com.tfg.backend_gymrat.domain.dto.entity.Role;
import com.tfg.backend_gymrat.domain.dto.entity.UserDTO;
import com.tfg.backend_gymrat.persistence.entity.User;
import org.mapstruct.Mapper;
import java.util.List;


@Mapper
public class UserMapper {

    public UserDTO toUserDTO(User user) {
        return new UserDTO(
                user.getUsername(),
                user.getEmail(),
                user.getPassword(),
                user.getGym_experience(),
                user.getBirth_date(),
                user.getHeight(),
                user.getWeight(),
                Role.valueOf(user.getRole()),
                user.getFriends()
        );
    }

    public User toUser(UserDTO userDTO) {
        return User.builder()
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
    }

    public List<UserDTO> toUserDTOs(List<User> users) {
        return users.stream().map(this::toUserDTO).toList();
    }

    public List<User> toUsers(List<UserDTO> userDTOs) {
        return userDTOs.stream().map(this::toUser).toList();
    }

}
