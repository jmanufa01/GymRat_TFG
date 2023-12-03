package com.tfg.backend_gymrat.constants;

import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.xml.bind.DatatypeConverter;
import javax.crypto.spec.SecretKeySpec;
import java.security.Key;

public class AuthConstants {

    public static final byte[] keyPass = DatatypeConverter
            .parseBase64Binary("aae87e062ecc0ede014526c3090ebbd3a812d4c3a4f48e8ea0a00d024954cc05");
    public static final Key SECRET_KEY = new SecretKeySpec(keyPass, SignatureAlgorithm.HS256.getJcaName());
    public static final String REGISTRATION_IN_PROCCESS = "User {} registration is in proccess...";
    public static final String REGISTRATION_SUCCESSFUL = "User {} has been registered succesfully!";
    public static final String REGISTRATION_FAILED = "Registration of user {} failed";
    public static final String LOGIN_IN_PROCCESS = "User {} login is in proccess...";
    public static final String LOGIN_SUCCESSFUL = "User {} has been logged in succesfully!";
    public static final String LOGIN_FAILED = "Log in of user {} failed";


}
