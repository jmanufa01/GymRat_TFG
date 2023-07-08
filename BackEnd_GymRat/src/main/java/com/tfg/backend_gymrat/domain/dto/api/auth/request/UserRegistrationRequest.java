package com.tfg.backend_gymrat.domain.dto.api.auth.request;

public record UserRegistrationRequest(
        String username,
        String email,
        String password,
        String gym_experience,
        Integer age,
        Double height,
        Double weight

) {}
