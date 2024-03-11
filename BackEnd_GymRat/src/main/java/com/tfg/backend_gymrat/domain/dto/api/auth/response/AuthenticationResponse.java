package com.tfg.backend_gymrat.domain.dto.api.auth.response;

import jakarta.annotation.Nonnull;

public record AuthenticationResponse(
  @Nonnull String jwt
) {}
