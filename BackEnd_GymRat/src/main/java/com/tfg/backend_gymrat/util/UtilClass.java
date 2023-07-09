package com.tfg.backend_gymrat.util;


import java.util.Arrays;
import java.util.List;

public class UtilClass {

    public static boolean isEmailValid(String email){
        System.out.println(email.split("@")[0]);
        return email.endsWith(".com") && email.contains("@") && !email.split("@")[0].trim().equals("");
    }

}
