package com.tfg.backend_gymrat.domain.service;

import com.tfg.backend_gymrat.domain.dto.entity.RoutineDTO;
import com.tfg.backend_gymrat.domain.repository.RoutineRepository;
import com.tfg.backend_gymrat.exceptions.MissingRequestDataException;
import com.tfg.backend_gymrat.util.UtilClass;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
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


    public List<RoutineDTO> findRoutineByUserAndMonth(String username, String date) throws Exception {
        Date firstDayOfMonth = new SimpleDateFormat("yyyy-MM-dd").parse(date.substring(0,8) + "01");
        Date lastDayOfMonth = new SimpleDateFormat("yyyy-MM-dd").parse(date.substring(0,8) + "31");

        return repository.findAllRoutinesByUsernameAndDateBetween(username,firstDayOfMonth, lastDayOfMonth).orElseThrow();
    }


}
