package com.tfg.backend_gymrat.domain.service;

import com.tfg.backend_gymrat.domain.dto.entity.NotificationDTO;
import com.tfg.backend_gymrat.domain.dto.entity.NotificationStatus;
import com.tfg.backend_gymrat.domain.repository.NotificationRepository;
import com.tfg.backend_gymrat.domain.repository.UserRepository;
import com.tfg.backend_gymrat.persistence.mongo.UserMongo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.tfg.backend_gymrat.exceptions.AppExceptions.*;
@Service
public class NotificationService {
    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private UserMongo userMongo;

    public List<NotificationDTO> obtainAllNotifications(String username){
         return notificationRepository.findAllNotificationsByUsername(username);
    }

    public void manageNotification(NotificationDTO notificationDTO) throws Exception {
        try {
            if(!userMongo.existsUserByUsername(notificationDTO.sender()) || !userMongo.existsUserByUsername(notificationDTO.receiver())) {
                throw new UserNotFoundException();
            }

            //Create new friend request
            if(notificationDTO.status() == NotificationStatus.PENDING) {
                notificationRepository.insertNotification(notificationDTO);
                return;
            }

            //Add friend to both users
            if(notificationDTO.status() == NotificationStatus.ACCEPTED) {
                final var sender = userMongo.findUserByUsername(notificationDTO.sender()).orElseThrow(UserNotFoundException::new);
                final var reciever = userMongo.findUserByUsername(notificationDTO.receiver()).orElseThrow(UserNotFoundException::new);
                if(sender.getFriends() == null) sender.setFriends(new ArrayList<>());
                if(reciever.getFriends() == null) reciever.setFriends(new ArrayList<>());

                sender.getFriends().add(reciever.getUsername());
                reciever.getFriends().add(sender.getUsername());
                userMongo.save(sender);
                userMongo.save(reciever);
            }else{
                //TODO: Send notification to sender that the request has been rejected
            }

            notificationRepository.deleteNotification(notificationDTO.id());
        }catch (Exception rte) {
            throw rte;
        }
    }




}
