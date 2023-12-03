package com.tfg.backend_gymrat.persistence.mapper;

import com.tfg.backend_gymrat.domain.dto.entity.NotificationDTO;
import com.tfg.backend_gymrat.domain.dto.entity.NotificationStatus;
import com.tfg.backend_gymrat.persistence.entity.Notification;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public class NotificationMapper {

    public NotificationDTO toNotificationDTO(Notification notification) {
        return new NotificationDTO(
                notification.getId(),
                notification.getSender(),
                notification.getReceiver(),
                notification.getMessage(),
                NotificationStatus.valueOf(notification.getStatus())
        );
    }

    public Notification toNotification(NotificationDTO notificationDTO) {
        return Notification.builder()
                .sender(notificationDTO.sender())
                .receiver(notificationDTO.receiver())
                .message(notificationDTO.message())
                .status(notificationDTO.status().name())
                .build();
    }

    public List<NotificationDTO> toNotificationDTOs(List<Notification> notifications) {
        return notifications.stream().map(this::toNotificationDTO).toList();
    }

    public List<Notification> toNotifications(List<NotificationDTO> notificationDTOs) {
        return notificationDTOs.stream().map(this::toNotification).toList();
    }

}
