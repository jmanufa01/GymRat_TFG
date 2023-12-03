package com.tfg.backend_gymrat.domain.service;

import com.tfg.backend_gymrat.domain.dto.entity.NotificationDTO;
import com.tfg.backend_gymrat.domain.dto.entity.NotificationStatus;
import com.tfg.backend_gymrat.persistence.entity.Notification;
import com.tfg.backend_gymrat.persistence.mapper.NotificationMapper;
import com.tfg.backend_gymrat.persistence.mongo.NotificationMongo;
import com.tfg.backend_gymrat.persistence.mongo.UserMongo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.tfg.backend_gymrat.exceptions.AppExceptions.*;
@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationMongo repository;

    private final NotificationMapper mapper;

    private final UserMongo userRepository;

    public List<NotificationDTO> obtainAllNotifications(String username){
         return mapper.toNotificationDTOs(repository.findAllByReceiver(username));
    }

    public void manageNotification(NotificationDTO notificationDTO) throws Exception {
        try {
            if(!userRepository.existsUserByUsername(notificationDTO.sender()) || !userRepository.existsUserByUsername(notificationDTO.receiver())) {
                throw new UserNotFoundException();
            }

            //Create new friend request
            if(notificationDTO.status() == NotificationStatus.PENDING) {

                final var notification = Notification.builder()
                        .sender(notificationDTO.sender())
                        .receiver(notificationDTO.receiver())
                        .status(notificationDTO.status().name())
                        .build();

                repository.insert(notification);
                return;
            }

            //Add friend to both users
            if(notificationDTO.status() == NotificationStatus.ACCEPTED) {
                final var sender = userRepository.findUserByUsername(notificationDTO.sender()).orElseThrow(UserNotFoundException::new);
                final var reciever = userRepository.findUserByUsername(notificationDTO.receiver()).orElseThrow(UserNotFoundException::new);
                if(sender.getFriends() == null) sender.setFriends(new ArrayList<>());
                if(reciever.getFriends() == null) reciever.setFriends(new ArrayList<>());

                sender.getFriends().add(reciever.getUsername());
                reciever.getFriends().add(sender.getUsername());
                userRepository.save(sender);
                userRepository.save(reciever);
            }else{
                //TODO: Send notification to sender that the request has been rejected
            }

            repository.deleteById(notificationDTO.id());
        }catch (Exception rte) {
            throw rte;
        }
    }




}
