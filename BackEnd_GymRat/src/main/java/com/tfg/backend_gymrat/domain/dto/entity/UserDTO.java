package com.tfg.backend_gymrat.domain.dto.entity;

import lombok.NonNull;

import java.util.Date;


public record UserDTO (

    @NonNull String username,
    @NonNull String email,
    @NonNull String password,
    @NonNull String gymExperience,
    @NonNull Date birthDate,
    @NonNull Double height,
    @NonNull Double weight,
    @NonNull Role role

) {}
