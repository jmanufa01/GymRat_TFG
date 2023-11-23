package com.tfg.backend_gymrat.domain.dto.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.NonNull;

import java.util.Date;
import java.util.List;

import static com.fasterxml.jackson.annotation.JsonInclude.*;

@JsonInclude(Include.NON_NULL)
public record UserDTO (

    @NonNull String username,
    @NonNull String email,
    @NonNull String password,
    @NonNull String gymExperience,
    @NonNull Date birthDate,
    @NonNull Double height,
    @NonNull Double weight,
    @NonNull Role role,
    List<String> friends

) {}
