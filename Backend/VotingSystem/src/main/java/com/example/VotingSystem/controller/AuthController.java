package com.example.VotingSystem.controller;

import com.example.VotingSystem.DTOs.AuthResponse;
import com.example.VotingSystem.DTOs.LoginRequest;
import com.example.VotingSystem.DTOs.RegisterRequest;
import com.example.VotingSystem.Entities.User;
import com.example.VotingSystem.Repositories.UserRepository;
import com.example.VotingSystem.Security.CustomUserDetails;
import com.example.VotingSystem.Security.JwtUtils;
import com.example.VotingSystem.Service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final UserRepository userRepository;

    public AuthController(AuthService authService,
                          AuthenticationManager authenticationManager,
                          JwtUtils jwtUtils,
                          UserRepository userRepository) {
        this.authService = authService;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest req) {
        try {
            User u = authService.register(req);
            return ResponseEntity.ok().body("User registered successfully");
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest req) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getNationalId(), req.getPassword())
        );

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        String jwt = jwtUtils.generateToken(userDetails);

        User u = userDetails.getUser();
        AuthResponse res = new AuthResponse(jwt, u.getId(), u.getFirstName(), u.getLastName(), u.getNationalId(), u.getEmail());
        return ResponseEntity.ok(res);
    }
}
