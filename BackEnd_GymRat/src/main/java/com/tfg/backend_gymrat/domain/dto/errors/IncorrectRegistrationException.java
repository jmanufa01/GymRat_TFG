package com.tfg.backend_gymrat.domain.dto.errors;

public class IncorrectRegistrationException extends Exception{

    public IncorrectRegistrationException(){
        super("Introduced email is incorrect");
    }


}
