package com.tfg.backend_gymrat.domain.service;

import com.tfg.backend_gymrat.domain.dto.entity.NotificationDTO;
import com.tfg.backend_gymrat.domain.repository.NotificationRepository;
import com.tfg.backend_gymrat.domain.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.tfg.backend_gymrat.exceptions.AppExceptions.*;
@Service
public class NotificationService {
    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private UserRepository userRepository;

    public List<NotificationDTO> obtainAllNotifications(String username){
         return notificationRepository.findAllNotificationsByUsername(username);
    }

    public void createNewNotification(NotificationDTO notificationDTO) throws Exception {
        try {
            if(!userRepository.existsUser(notificationDTO.sender()) || !userRepository.existsUser(notificationDTO.receiver())) {
                throw new UserNotFoundException();
            }

            notificationRepository.insertNotification(notificationDTO);

        }catch (Exception rte) {
            throw rte;
        }
    }




}
