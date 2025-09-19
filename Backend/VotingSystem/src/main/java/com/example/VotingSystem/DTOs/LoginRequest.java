package com.example.VotingSystem.DTOs;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {
    @NotBlank
    private String nationalId;

    @NotBlank
    private String password;


}
