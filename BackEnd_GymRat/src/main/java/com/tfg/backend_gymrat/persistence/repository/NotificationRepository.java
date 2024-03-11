package com.tfg.backend_gymrat.persistence.repository;

import com.tfg.backend_gymrat.persistence.entity.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface NotificationRepository extends MongoRepository<Notification, String> {
    List<Notification> findAllByReceiver(String receiver);
    boolean existsNotificationBySenderAndReceiver(String sender, String receiver);
    boolean existsNotificationByReceiverAndSender(String receiver, String sender);
}
