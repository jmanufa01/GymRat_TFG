package com.tfg.backend_gymrat.domain.repository.impl;

import com.tfg.backend_gymrat.domain.dto.entity.NotificationDTO;
import com.tfg.backend_gymrat.domain.repository.NotificationRepository;
import com.tfg.backend_gymrat.persistence.mapper.NotificationMapper;
import com.tfg.backend_gymrat.persistence.mongo.NotificationMongo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class NotificationRepositoryImpl implements NotificationRepository {

    @Autowired
    private NotificationMongo mongo;
    @Autowired
    private NotificationMapper mapper;

    @Override
    public List<NotificationDTO> findAllNotificationsByUsername(String username) {
        return mongo.findAllByReceiver(username).stream().map(notification -> mapper.toNotificationDTO(notification)).toList();
    }

    @Override
    public NotificationDTO findNotificationById(String id) {
        return mongo.findById(id).map(notification -> mapper.toNotificationDTO(notification)).orElse(null);
    }

    @Override
    public void insertNotification(NotificationDTO notificationDTO) {
        mongo.insert(mapper.toNotification(notificationDTO));
    }

    @Override
    public void updateNotification(NotificationDTO notificationDTO) {
        mongo.save(mapper.toNotification(notificationDTO));
    }

    @Override
    public void deleteNotification(String id) {
        mongo.deleteById(id);
    }

}
