package com.tfg.backend_gymrat.exceptions;

public class IncorrectRegistrationException extends Exception{
    public IncorrectRegistrationException(){
        super("Introduced email is incorrect");
    }

}
