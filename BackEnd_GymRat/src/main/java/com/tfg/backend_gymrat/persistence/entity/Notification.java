package com.tfg.backend_gymrat.persistence.entity;


import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@SuperBuilder
@EqualsAndHashCode
@NoArgsConstructor
@Document("notification")
public class Notification {
    @Id
    private String id;
    private String sender;
    private String receiver;
    private String message;
    private String status;
}
