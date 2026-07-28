package com.intervo.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Split out from SecurityConfig: AuthService (needed by OAuth2LoginSuccessHandler,
 * which SecurityConfig depends on) needs PasswordEncoder, so defining it inside
 * SecurityConfig created a circular bean dependency.
 */
@Configuration
public class PasswordEncoderConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
