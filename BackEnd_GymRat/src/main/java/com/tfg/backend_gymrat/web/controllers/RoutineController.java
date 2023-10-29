package com.tfg.backend_gymrat.web.controllers;

import com.tfg.backend_gymrat.constants.AppConstants;
import com.tfg.backend_gymrat.domain.dto.api.routines.request.UsernameHeader;
import com.tfg.backend_gymrat.domain.dto.entity.RoutineDTO;
import com.tfg.backend_gymrat.domain.service.RoutineService;
import com.tfg.backend_gymrat.util.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/v1/routines")
public class RoutineController {

    @Autowired
    private RoutineService routineService;

    private final Log log = new Log();

    @PostMapping("/save")
    public ResponseEntity<Void> insertNewEntity(@RequestBody RoutineDTO routine) throws Exception{

        try{
            log.log(AppConstants.INSERTING_ROUTINE);
            System.out.println(routine.toString());
            routineService.insertNewRoutine(routine);

            log.log(AppConstants.ROUTINE_INSERTION_SUCCESS);
            return ok().build();
        }catch (Exception e){
            log.log(AppConstants.ROUTINE_INSERTION_FAILURE);
            throw e;
        }
    }

    @GetMapping("/{date}")
    public ResponseEntity<List<RoutineDTO>> obtainRoutinesByMonth(@PathVariable String date, @RequestHeader UsernameHeader usernameHeader) throws Exception {
        try{
            log.log(AppConstants.OBTAINING_ROUTINES);

            List<RoutineDTO> routines = routineService.findRoutineByUserAndMonth(usernameHeader.username(),date);
            System.out.println(date);
            log.log(AppConstants.ROUTINE_OBTAINMENT_SUCCESS);
            return ok(routines);
        }catch (Exception e){
            log.log("Error: " + e.getMessage());
            log.log(AppConstants.ROUTINE_OBTAINMENT_FAILURE);
            throw e;
        }
    }

}
