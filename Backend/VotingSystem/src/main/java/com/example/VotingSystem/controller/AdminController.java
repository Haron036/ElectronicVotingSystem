package com.example.VotingSystem.controller;

import com.example.VotingSystem.DTOs.AddCandidateRequest;
import com.example.VotingSystem.DTOs.CreateElectionRequest;
import com.example.VotingSystem.Entities.Candidate;
import com.example.VotingSystem.Entities.Election;
import com.example.VotingSystem.Repositories.CandidateRepository;
import com.example.VotingSystem.Repositories.ElectionRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final ElectionRepository electionRepo;
    private final CandidateRepository candidateRepo;

    public AdminController(ElectionRepository electionRepo, CandidateRepository candidateRepo) {
        this.electionRepo = electionRepo;
        this.candidateRepo = candidateRepo;
    }

    // ✅ Create new election
    @PostMapping("/elections")
    public ResponseEntity<?> createElection(@RequestBody CreateElectionRequest req) {
        Election election = new Election();
        election.setTitle(req.getTitle());
        election.setDescription(req.getDescription());
        election.setType(req.getType());
        election.setStatus(req.getStatus());
        election.setStartDate(req.getStartDate());
        election.setEndDate(req.getEndDate());

        electionRepo.save(election);
        return ResponseEntity.ok(election);
    }

    // ✅ Add candidate to election
    @PostMapping("/candidates")
    public ResponseEntity<?> addCandidate(@RequestBody AddCandidateRequest req) {
        Election election = electionRepo.findById(req.getElectionId())
                .orElseThrow(() -> new RuntimeException("Election not found"));

        Candidate candidate = new Candidate();
        candidate.setName(req.getName());
        candidate.setParty(req.getParty());
        candidate.setElection(election);

        candidateRepo.save(candidate);
        return ResponseEntity.ok(candidate);
    }
}
