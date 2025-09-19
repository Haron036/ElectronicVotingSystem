package com.example.VotingSystem.Service;

import com.example.VotingSystem.DTOs.RegisterRequest;
import com.example.VotingSystem.Entities.User;
import com.example.VotingSystem.Repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository repo, PasswordEncoder encoder) {
        this.userRepository = repo;
        this.passwordEncoder = encoder;
    }

    public User register(RegisterRequest req) {
        if (userRepository.existsByNationalId(req.getNationalId())) {
            throw new IllegalArgumentException("National ID already registered");
        }
        if (req.getEmail() != null && userRepository.existsByEmail(req.getEmail())) {
            throw new IllegalArgumentException("Email already registered");
        }

        User u = new User();
        u.setNationalId(req.getNationalId());
        u.setFirstName(req.getFirstName());
        u.setLastName(req.getLastName());
        u.setEmail(req.getEmail());
        u.setPhone(req.getPhone());
        u.setDateOfBirth(req.getDateOfBirth());
        u.setCounty(req.getCounty());
        u.setConstituency(req.getConstituency());
        u.setWard(req.getWard());
        u.setPassword(passwordEncoder.encode(req.getPassword()));
        return userRepository.save(u);
    }
}
