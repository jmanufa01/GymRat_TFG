package com.tfg.backend_gymrat.web.controllers;

import com.tfg.backend_gymrat.constants.AppConstants;
import com.tfg.backend_gymrat.domain.dto.entity.Role;
import com.tfg.backend_gymrat.domain.dto.entity.RoutineDTO;
import com.tfg.backend_gymrat.domain.service.RoutineService;
import com.tfg.backend_gymrat.util.Log;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Array;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/v1/routines")
public class RoutineController {

    @Autowired
    private RoutineService routineService;

    private final Log log = new Log();

    @PostMapping("/save")
    public ResponseEntity<Void> insertNewEntity(@RequestBody RoutineDTO routine) throws Exception {

        try{
            log.log(AppConstants.INSERTING_ROUTINE);

            routineService.insertNewRoutine(routine);

            return ok().build();

        }catch (Exception e){
            log.log(AppConstants.ROUTINE_INSERTION_FAILURE);
            throw e;
        }

    }

}
