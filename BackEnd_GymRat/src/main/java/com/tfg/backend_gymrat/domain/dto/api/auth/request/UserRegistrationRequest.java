package com.tfg.backend_gymrat.domain.dto.api.auth.request;

public record UserRegistrationRequest(

        String userName,
        String email,
        String password,
        String gym_experiece,
        Integer age,
        Double height,
        Double weight

) {}
