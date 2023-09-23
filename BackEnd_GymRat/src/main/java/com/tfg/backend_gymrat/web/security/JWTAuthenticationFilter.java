package com.tfg.backend_gymrat.web.security;


import com.tfg.backend_gymrat.domain.service.JWTService;
import com.tfg.backend_gymrat.domain.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;


@Component
@Getter
public class JWTAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private  JWTService jwtService;
    @Autowired
    private UserService userService;

    private final RequestMatcher ignoredPaths = new AntPathRequestMatcher("/v1/auth/**");


    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");
        String jwt;
        String userName;

        if(this.ignoredPaths.matches(request)){
            filterChain.doFilter(request,response);
            return;
        }


        if(authHeader == null || !authHeader.startsWith("Bearer ")){
            filterChain.doFilter(request,response);
            return;
        }
        jwt = authHeader.split(" ")[1].trim();

        if(!jwtService.isTokenValid(jwt)){
            filterChain.doFilter(request,response);
            return;
        }

        userName = jwtService.extractUserName(jwt);


        if((userName != null && SecurityContextHolder.getContext().getAuthentication() == null)
                || !((UserDetails)SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername().equals(userName)){
            UserDetails userDetails = userService.findUserByUsername(userName);

            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails == null ? List.of(): userDetails.getAuthorities()
                    );

            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            filterChain.doFilter(request,response);
            return;
        }
        filterChain.doFilter(request,response);
    }

}
