package com.example.VotingSystem.DTOs;

import java.time.LocalDateTime;

public class VoteResponse {
    private Long voteId;
    private Long userId;
    private Long electionId;
    private String electionTitle;
    private Long candidateId;
    private String candidateName;
    private String candidateParty;
    private String candidatePosition; // ✅ new field
    private LocalDateTime timestamp;

    public VoteResponse(
            Long voteId,
            Long userId,
            Long electionId,
            String electionTitle,
            Long candidateId,
            String candidateName,
            String candidateParty,
            String candidatePosition,
            LocalDateTime timestamp
    ) {
        this.voteId = voteId;
        this.userId = userId;
        this.electionId = electionId;
        this.electionTitle = electionTitle;
        this.candidateId = candidateId;
        this.candidateName = candidateName;
        this.candidateParty = candidateParty;
        this.candidatePosition = candidatePosition;
        this.timestamp = timestamp;
    }

    // Getters
    public Long getVoteId() { return voteId; }
    public Long getUserId() { return userId; }
    public Long getElectionId() { return electionId; }
    public String getElectionTitle() { return electionTitle; }
    public Long getCandidateId() { return candidateId; }
    public String getCandidateName() { return candidateName; }
    public String getCandidateParty() { return candidateParty; }
    public String getCandidatePosition() { return candidatePosition; }
    public LocalDateTime getTimestamp() { return timestamp; }
}
