package com.tfg.backend_gymrat.web.controllers;

import com.tfg.backend_gymrat.domain.dto.entity.NotificationDTO;
import com.tfg.backend_gymrat.domain.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("v1/notifications")
@RequiredArgsConstructor
public class NotificationRestController {

    private final NotificationService notificationService;

    @GetMapping("{username}")
    public ResponseEntity<List<NotificationDTO>> obtainAllNotifications(@PathVariable String username){
        return ok(notificationService.obtainAllNotifications(username));
    }

    @PostMapping
    public ResponseEntity<Void> manageNotification(@RequestBody NotificationDTO notificationDTO) throws Exception {
        notificationService.manageNotification(notificationDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }





}
