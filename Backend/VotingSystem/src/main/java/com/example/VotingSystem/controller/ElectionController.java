package com.example.VotingSystem.controller;

import com.example.VotingSystem.Entities.Candidate;
import com.example.VotingSystem.Entities.Election;
import com.example.VotingSystem.Service.ElectionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/elections")
public class ElectionController {

    private final ElectionService electionService;

    public ElectionController(ElectionService electionService) {
        this.electionService = electionService;
    }

    // Create new election
    @PostMapping
    public ResponseEntity<Election> createElection(@RequestBody Election election) {
        Election savedElection = electionService.createElection(election);
        return ResponseEntity.ok(savedElection);
    }

    // Add candidate to election ✅ return updated election with candidates
    @PostMapping("/{id}/candidates")
    public ResponseEntity<Election> addCandidate(@PathVariable Long id,
                                                 @RequestBody Candidate candidate) {
        electionService.addCandidate(id, candidate);
        return electionService.getElectionById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Get all elections
    @GetMapping
    public ResponseEntity<List<Election>> getAllElections() {
        List<Election> elections = electionService.getAllElections();
        return ResponseEntity.ok(elections);
    }

    // Get election by ID
    @GetMapping("/{id}")
    public ResponseEntity<Election> getElectionById(@PathVariable Long id) {
        return electionService.getElectionById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
