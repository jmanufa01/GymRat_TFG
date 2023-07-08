package com.tfg.backend_gymrat.persistence.mapper;

import com.tfg.backend_gymrat.domain.dto.entity.UserDTO;
import com.tfg.backend_gymrat.persistence.entity.User;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface UserMapper {


    @Mappings({
            @Mapping(source = "username",target = "username"),
            @Mapping(source = "gym_experience", target = "gymExperience")
    })
    UserDTO toUserDTO(User user);

    @InheritInverseConfiguration
    User toUser(UserDTO userDTO);

}
