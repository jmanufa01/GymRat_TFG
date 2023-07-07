package com.tfg.backend_gymrat.web.security;


import com.tfg.backend_gymrat.domain.service.AuthService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParserBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.xml.bind.DatatypeConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;

@Service
public class JWTService {
    private static final byte[] keyPass = DatatypeConverter
            .parseBase64Binary("6d01b6098fec840b681cfe7441311a6ca26443412064bdcc31a693d678e0ba1e");  //Secret pass encrypted
    private static final Key SECRET_KEY = new SecretKeySpec(keyPass, SignatureAlgorithm.HS256.getJcaName());

    @Autowired
    private AuthService authService;

    /**
     * Método que genera un JWT encriptado que contiene el email, el tipo de usuario y el ID de usuario, añadiéndole una
     * fecha de expiración de 10 horas (600 minutos)
     * @param userName email del usuario
     * @param password tipo de usuario (siendo 0,1 o 2)
     * @param role ID de usuario
     * @return JWT
     */
    public String generateToken(String userName,String password, String role){

        HashMap<String,Object> payload = new HashMap<>();
        payload.put("user",userName);
        payload.put("pass",password);
        payload.put("role",role);
        return Jwts.builder().setClaims(payload)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 3600 * 10))
                .signWith(SECRET_KEY)
                .compact();
    }

    /**
     * Método para obtener el payload de un jwt enviado por el cliente.
     * @param token
     * @return payload en objeto Claims
     */
    public Claims getClaims(String token)
    {
        JwtParserBuilder jwtParserBuilder = Jwts.parserBuilder().setSigningKey(SECRET_KEY);  //Creamos el metodo de descrifrado del jwt con la clave previamente creada
        System.out.println(jwtParserBuilder.build().parse(token).getBody()); //Obtenemos el payload (body del jwt)
        return (Claims) jwtParserBuilder.build().parse(token).getBody();
    }

    /**
     * Método para extraer el email de un payload
     * @param jwt jwt token to extract info of
     * @return userName
     */
    public String extractUserName(String jwt){
        Claims payload = getClaims(jwt);
        return payload.get("user").toString();
    }

    /**
     * Método para extraer el Id de un determinado payload de un JWT.
     * @param payload contiene el Id y proviene del JWT.
     * @return id del payload
     */
    public Integer extractPass(Claims payload)
    {
        return Integer.valueOf(payload.get("pass").toString());
    }

    /**
     * Método para extraer el tipo de usuario de un determinado payload de un JWT.
     * @param payload ontiene el tipo de usuario y proviene del JWT.
     * @return tipo de usuario del JWT
     */
    public Integer extractRole(Claims payload)
    {
        return Integer.valueOf(payload.get("role").toString());
    }

    /**
     * Método para comprobar si un token está expirado o no
     * @param payload
     * @return true si lo esta y false si no lo está
     */
    public boolean isExpired(Claims payload)
    {
        return payload.getExpiration().before(new Date());
    }

    /**
     * Método que se encarga de validar un token, comporbando que no esté expirado y que el email existe en la base de datos
     * (esto es como protección de que no se ha modificado el token)
     * @param jwt jwt token
     * @return returns if the jwtoken is still valid
     */
    public boolean isTokenValid(String jwt){
        Claims payload = getClaims(jwt);
        return !isExpired(payload) && authService.existsUserByUserName(extractUserName(jwt));
    }

}
