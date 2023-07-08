package com.tfg.backend_gymrat.domain.dto.api.auth.request;

import lombok.NonNull;

public record UserRegistrationRequest(
        @NonNull String username,
        @NonNull String email,
        @NonNull String password,
        @NonNull String gym_experience,
        @NonNull Integer age,
        @NonNull Double height,
        @NonNull Double weight
) {}
