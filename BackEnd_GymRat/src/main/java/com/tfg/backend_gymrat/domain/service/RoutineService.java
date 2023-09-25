package com.tfg.backend_gymrat.domain.service;

import com.tfg.backend_gymrat.domain.dto.entity.RoutineDTO;
import com.tfg.backend_gymrat.domain.repository.RoutineRepository;
import com.tfg.backend_gymrat.exceptions.MissingRequestDataException;
import com.tfg.backend_gymrat.util.UtilClass;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class RoutineService {

    @Autowired
    private RoutineRepository repository;

    public void insertNewRoutine(RoutineDTO routine) throws Exception {

        if(!UtilClass.isRoutineRequestValid(routine)){
            throw new MissingRequestDataException();
        }

        repository.insertRoutine(routine);
    }


    public List<RoutineDTO> findRoutineByUserAndMonth(String username, Date date){
        return repository.findAllRoutinesByUsername(username).orElseThrow();
    }


}
