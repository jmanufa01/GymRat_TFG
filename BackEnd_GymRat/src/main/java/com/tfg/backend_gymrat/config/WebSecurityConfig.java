package com.tfg.backend_gymrat.config;


import com.tfg.backend_gymrat.domain.repository.UserRepository;
import com.tfg.backend_gymrat.web.security.JWTAuthenticationFilter;
import com.tfg.backend_gymrat.web.security.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig{

    @Autowired
    private UserRepository repository;

    @Autowired
    private JWTService jwtService;


    @Bean
    public UserDetailsService userDetailsService() {

        return username -> repository.findByUserName(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));

    }


    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(this.userDetailsService());
        authProvider.setPasswordEncoder(this.passwordEncoder());
        return authProvider;
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{

        return http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests((requests) ->
                        requests.requestMatchers("/v1/auth/**")
                                .permitAll()
                                .anyRequest()
                                .authenticated()
                ).sessionManagement(sessionManagementConfigurer -> {
                    sessionManagementConfigurer.init(http);
                    sessionManagementConfigurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
                })
                .authenticationProvider(this.authenticationProvider())
                .addFilterBefore(new JWTAuthenticationFilter(jwtService,userDetailsService()),null) //TODO: end this security implementation
                .build();

    }


}
