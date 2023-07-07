package com.tfg.backend_gymrat.util;


import java.util.List;

public class UtilClass {

    public static boolean isEmailValid(String email){
        return email.endsWith(".com") && email.contains("@");
    }

}
