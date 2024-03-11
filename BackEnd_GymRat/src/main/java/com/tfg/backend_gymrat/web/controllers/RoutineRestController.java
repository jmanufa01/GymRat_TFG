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
@RequestMapping("routines")
@RequiredArgsConstructor
public class RoutineRestController {

    private final RoutineService routineService;

    @GetMapping(params = {"username","muscle"})
    public ResponseEntity<List<RoutineDTO>> obtainRoutinesByMuscle(@RequestParam String username, @RequestParam String muscle) throws Exception{
        final var routines = routineService.findRoutinesByUserAndMuscle(username, muscle);
        return ok(routines);
    }

    @GetMapping(params = {"username","exerciseName"})
    public ResponseEntity<List<RoutineDTO>> obtainRoutinesByExerciseName(@RequestParam String username, @RequestParam String exerciseName) throws Exception{
        final var routines = routineService.findRoutinesByUsernameAndExerciseName(username, exerciseName);
        return ok(routines);
    }

    @GetMapping("{date}")
    public ResponseEntity<List<RoutineDTO>> obtainRoutinesByMonth(@PathVariable String date, @RequestHeader UsernameHeader usernameHeader) throws Exception{
        final var routines = routineService.findRoutinesByUserAndMonth(usernameHeader.username(),date);
        return ok(routines);
    }

    @PostMapping
    public ResponseEntity<RoutineDTO> insertNewRoutine(@RequestBody RoutineDTO routineDTO) throws Exception{
            final var routine = routineService.insertRoutine(routineDTO);
            return new ResponseEntity<>(routine, HttpStatus.CREATED);
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
