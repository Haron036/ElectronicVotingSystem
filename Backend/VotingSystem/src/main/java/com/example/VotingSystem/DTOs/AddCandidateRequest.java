package com.example.VotingSystem.DTOs;

import lombok.Data;

@Data
public class AddCandidateRequest {
    private Long electionId;
    private String name;
    private String party;


}
