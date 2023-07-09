package com.tfg.backend_gymrat.domain.dto.errors;

public record Error(
        Integer statusCode,
        String message,
        String description
){}
