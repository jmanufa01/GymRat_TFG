package com.tfg.backend_gymrat.web.controllers;

import com.tfg.backend_gymrat.domain.dto.api.routines.request.UsernameHeader;
import com.tfg.backend_gymrat.domain.dto.entity.RoutineDTO;
import com.tfg.backend_gymrat.domain.service.RoutineService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("v1/routines")
@RequiredArgsConstructor
public class RoutineRestController {

    private final RoutineService routineService;

    @GetMapping("{date}")
    public ResponseEntity<List<RoutineDTO>> obtainRoutinesByMonth(@PathVariable String date, @RequestHeader UsernameHeader usernameHeader) throws Exception{
        final var routines = routineService.findRoutineByUserAndMonth(usernameHeader.username(),date);
        return ok(routines);
    }

    @PostMapping("save")
    public ResponseEntity<Void> insertNewRoutine(@RequestBody RoutineDTO routine) throws Exception{
            routineService.insertRoutine(routine);
            return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Void> updateRoutine(@RequestBody RoutineDTO routine) throws Exception{
            routineService.updateRoutine(routine);
            return ok().build();
    }

    @DeleteMapping(value = "{id}", params = "username")
    public ResponseEntity<Void> deleteRoutine(@PathVariable String id, @RequestParam("username") String username) throws Exception{
            routineService.deleteRoutine(id, username);
            return ok().build();
    }
}
