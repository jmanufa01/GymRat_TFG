package com.tfg.backend_gymrat.persistence.entity;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Document("notification")
public class Notification {
    @Id
    private String id;
    private String sender;
    private String receiver;
    private String message;
    private String status;
}
