package com.tfg.backend_gymrat.domain.dto.entity;

import lombok.NonNull;

public record NotificationDTO(
        @NonNull String sender,
        @NonNull String receiver,
        @NonNull String message,
        @NonNull NotificationStatus status
) {}
