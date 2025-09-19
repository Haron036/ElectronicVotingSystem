package com.example.VotingSystem.DTOs;

public class ElectionResultDTO {
    private String candidateName;
    private String party;
    private Long votes;

    public ElectionResultDTO(String candidateName, String party, Long votes) {
        this.candidateName = candidateName;
        this.party = party;
        this.votes = votes;
    }

    public String getCandidateName() { return candidateName; }
    public String getParty() { return party; }
    public Long getVotes() { return votes; }
}
