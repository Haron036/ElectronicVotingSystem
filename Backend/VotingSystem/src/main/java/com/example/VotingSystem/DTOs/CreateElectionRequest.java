package com.example.VotingSystem.DTOs;

import com.example.VotingSystem.Entities.ElectionStatus;
import com.example.VotingSystem.Entities.ElectionType;
import lombok.Data;

import java.time.LocalDateTime;
@Data
public class CreateElectionRequest {
    private String title;
    private String description;
    private ElectionType type;
    private ElectionStatus status;
    private LocalDateTime startDate;
    private LocalDateTime endDate;


}
