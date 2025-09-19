package com.example.VotingSystem.DTOs;

import com.example.VotingSystem.Entities.User;
import lombok.Data;

@Data
public class UserDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String county;
    private String constituency;
    private long votesCount;

    public UserDTO(User user, long votesCount) {
        this.id = user.getId();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.county = user.getCounty();
        this.constituency = user.getConstituency();
        this.votesCount = votesCount;
    }
}
