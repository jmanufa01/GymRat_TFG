package com.tfg.backend_gymrat.domain.dto.api.auth.request;

import lombok.Data;

@Data
public class AuthorizationHeader {
    private String[] authorization;
}
