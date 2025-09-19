package com.example.VotingSystem.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "candidates")
public class Candidate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String party;

    @Column(nullable = false)
    private String position; // ✅ New field

    @ManyToOne
    @JoinColumn(name = "election_id")
    @JsonBackReference
    private Election election;

    @Transient
    private Long votesCount = 0L;

    // Getters
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getParty() { return party; }
    public String getPosition() { return position; } // ✅
    public Election getElection() { return election; }
    public Long getVotesCount() { return votesCount; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setParty(String party) { this.party = party; }
    public void setPosition(String position) { this.position = position; } // ✅
    public void setElection(Election election) { this.election = election; }
    public void setVotesCount(Long votesCount) { this.votesCount = votesCount; }
}
