package com.example.VotingSystem.Security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.List;

@Configuration
public class CorsConfig {

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // ➡️ Define the allowed origins for your front-end application
        configuration.setAllowedOrigins(List.of("https://electronicvotingkenya-frontend.onrender.com", "http://localhost:5173"));
        // ⚠️ For development or temporary testing, you can use: configuration.setAllowedOrigins(List.of("*"));
        // ⚠️ But for production, always specify the exact origin.

        // ✅ Define the allowed HTTP methods
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // ✅ Allow all headers from the client
        configuration.setAllowedHeaders(Arrays.asList("*"));

        // ✅ Allow credentials (e.g., cookies, authorization headers)
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // ➡️ Apply the CORS configuration to all API endpoints
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}