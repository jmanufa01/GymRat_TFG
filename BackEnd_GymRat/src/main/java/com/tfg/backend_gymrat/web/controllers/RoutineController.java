package com.tfg.backend_gymrat.web.controllers;

import com.tfg.backend_gymrat.constants.AppConstants;
import com.tfg.backend_gymrat.domain.dto.api.auth.response.AuthenticationResponse;
import com.tfg.backend_gymrat.domain.dto.entity.RoutineDTO;
import com.tfg.backend_gymrat.domain.service.RoutineService;
import com.tfg.backend_gymrat.util.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/v1/routines")
public class RoutineController {

    @Autowired
    private RoutineService routineService;

    private final Log log = new Log();

    @PostMapping("/save")
    public ResponseEntity<Void> insertNewEntity(RoutineDTO routine) throws Exception{

        try{
            log.log(AppConstants.INSERTING_ROUTINE);
            routineService.insertNewRoutine(routine);

            log.log(AppConstants.ROUTINE_INSERTION_SUCCESS);
            return ok().build();
        }catch (Exception e){
            log.log(AppConstants.ROUTINE_INSERTION_FAILURE);
            throw e;
        }
    }


    @GetMapping("/hello")
    public ResponseEntity<AuthenticationResponse> returnHello() {
        return ok(new AuthenticationResponse("hello"));
    }

}
