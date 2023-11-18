package com.tfg.backend_gymrat.persistence.entity;


import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@EqualsAndHashCode
@NoArgsConstructor
@Document("notification")
public class Notification {
    private String sender;
    private String receiver;
    private String message;
    private String status;
}
