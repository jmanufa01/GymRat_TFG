package com.tfg.backend_gymrat.domain.service;


import com.tfg.backend_gymrat.constants.AuthConstants;
import com.tfg.backend_gymrat.web.security.Payload;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParserBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.io.Serializable;
import java.util.Date;


@Service
@RequiredArgsConstructor
public class JWTService implements Serializable {


    private final UserService userService;

    /**
     * Método que genera un JWT encriptado que contiene el email, el tipo de usuario y el ID de usuario, añadiéndole una
     * fecha de expiración de 10 horas (600 minutos)
     * @param username user's username registered with
     * @return JWT
     */
    public String generateToken(String username){
        Payload payload = new Payload();
        payload.put("user",username);
        return Jwts.builder()
                    .setClaims(payload.getPayload())
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + 1000 * 3600 * 10))
                    .signWith(AuthConstants.SECRET_KEY,SignatureAlgorithm.HS256)
                    .compact();

    }

    /**
     * Método para obtener el payload de un jwt enviado por el cliente.
     * @param token
     * @return payload en objeto Claims
     */
    public Claims getClaims(String token)
    {
        JwtParserBuilder jwtParserBuilder = Jwts.parserBuilder().setSigningKey(AuthConstants.SECRET_KEY);
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
        return !isExpired(payload) && userService.existsUserByUserName(extractUserName(jwt));
    }

}
