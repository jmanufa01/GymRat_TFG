package com.tfg.backend_gymrat.domain.repository;

import com.tfg.backend_gymrat.domain.dto.entity.NotificationDTO;

import java.util.List;

public interface NotificationRepository {
    List<NotificationDTO> findAllNotificationsByUsername(String username);

    NotificationDTO findNotificationById(String id);

    void insertNotification(NotificationDTO notificationDTO);

    void updateNotification(NotificationDTO notificationDTO);

    void deleteNotification(String id);
}
