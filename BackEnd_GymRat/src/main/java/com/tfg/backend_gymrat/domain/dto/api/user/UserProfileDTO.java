package com.tfg.backend_gymrat.domain.dto.api.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NonNull;

import java.util.Date;

public record UserProfileDTO(@NonNull String userName,
                             @NonNull String email,
                             @NonNull String gymExperience,
                             @NonNull Date birthDate,
                             @NonNull Double weight,
                             @NonNull Double height) { }
