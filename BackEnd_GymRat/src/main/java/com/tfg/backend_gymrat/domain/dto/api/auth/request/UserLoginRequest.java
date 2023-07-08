package com.tfg.backend_gymrat.domain.dto.api.auth.request;

import lombok.NonNull;

public record UserLoginRequest(
        @NonNull String username,
        @NonNull String password   //It should be hashed since it is done at front-end
) {}
