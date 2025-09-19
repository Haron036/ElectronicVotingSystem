package com.example.VotingSystem.DTOs;

public class AuthResponse {
    private String token;
    private Long userId;
    private String firstName;
    private String lastName;
    private String nationalId;
    private String email;

    public AuthResponse(String token, Long userId, String firstName, String lastName, String nationalId, String email) {
        this.token = token;
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.nationalId = nationalId;
        this.email = email;
    }

    // getters
    public String getToken() { return token; }
    public Long getUserId() { return userId; }
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public String getNationalId() { return nationalId; }
    public String getEmail() { return email; }
}
