package com.tfg.backend_gymrat.persistence.mapper;

import com.tfg.backend_gymrat.domain.dto.entity.NotificationDTO;
import com.tfg.backend_gymrat.persistence.entity.Notification;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper
public interface NotificationMapper {
    NotificationDTO toNotificationDTO(Notification notification);
    Notification toNotification(NotificationDTO notificationDTO);
    List<NotificationDTO> toNotificationDTOs(List<Notification> notifications);
    List<Notification> toNotifications(List<NotificationDTO> notificationDTOs);
}
