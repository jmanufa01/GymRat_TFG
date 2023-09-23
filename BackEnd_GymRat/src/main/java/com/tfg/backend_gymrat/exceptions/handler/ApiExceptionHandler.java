package com.tfg.backend_gymrat.exceptions.handler;

import com.tfg.backend_gymrat.domain.dto.errors.Error;
import com.tfg.backend_gymrat.exceptions.IncorrectRegistrationException;
import com.tfg.backend_gymrat.exceptions.MissingRequestDataException;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.Arrays;

@ControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(AuthenticationException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public Error sendNotFoundError(Exception e){
        return new Error(HttpStatus.NOT_FOUND.value(), HttpStatus.NOT_FOUND.getReasonPhrase(), e.getMessage());
    }


    @ExceptionHandler({
            MissingRequestDataException.class,
            IncorrectRegistrationException.class,
            Exception.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public Error sendBadRequestError(Exception e){
        return new Error(HttpStatus.BAD_REQUEST.value(), HttpStatus.BAD_REQUEST.getReasonPhrase(), e.getMessage());
    }

    //@ExceptionHandler({
      //      HttpMessageNotReadableException.class
    //})
    //public void messageNotReadable(){}  //Change this when error found (Controller executed twice)
}
