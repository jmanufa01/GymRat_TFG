package com.tfg.backend_gymrat.web.security;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.HashMap;

@Data
@EqualsAndHashCode
public class Payload {

    private final HashMap<String,Object> payload = new HashMap<>();

    public void put(String key,Object value){
        payload.put(key,value);
    }

}
