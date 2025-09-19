package com.example.VotingSystem.Entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "votes")
public class Vote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "election_id")
    private Election election;

    @ManyToOne
    @JoinColumn(name = "candidate_id")
    private Candidate candidate;

    private LocalDateTime timestamp = LocalDateTime.now();

    // Getters
    public Long getId() { return id; }
    public User getUser() { return user; }
    public Election getElection() { return election; }
    public Candidate getCandidate() { return candidate; }
    public LocalDateTime getTimestamp() { return timestamp; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setUser(User user) { this.user = user; }
    public void setElection(Election election) { this.election = election; }
    public void setCandidate(Candidate candidate) { this.candidate = candidate; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
