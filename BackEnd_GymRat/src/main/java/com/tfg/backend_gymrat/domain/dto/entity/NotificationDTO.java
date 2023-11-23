package com.tfg.backend_gymrat.domain.dto.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.NonNull;

import static com.fasterxml.jackson.annotation.JsonInclude.*;


@JsonInclude(Include.NON_NULL)
public record NotificationDTO(
        String id,
        @NonNull String sender,
        @NonNull String receiver,
        @NonNull String message,
        @NonNull NotificationStatus status
) {}
