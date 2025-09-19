package com.example.VotingSystem.Service;

import com.example.VotingSystem.Entities.Candidate;
import com.example.VotingSystem.Entities.Election;
import com.example.VotingSystem.Entities.ElectionStatus;
import com.example.VotingSystem.Repositories.CandidateRepository;
import com.example.VotingSystem.Repositories.ElectionRepository;
import com.example.VotingSystem.Repositories.VoteRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ElectionService {

    private final ElectionRepository electionRepository;
    private final CandidateRepository candidateRepository;
    private final VoteRepository voteRepository;

    public ElectionService(ElectionRepository electionRepository,
                           CandidateRepository candidateRepository,
                           VoteRepository voteRepository) {
        this.electionRepository = electionRepository;
        this.candidateRepository = candidateRepository;
        this.voteRepository = voteRepository;
    }

    // Create a new election
    public Election createElection(Election election) {
        return electionRepository.save(election);
    }

    // Add candidate to an election (✅ FIXED: returns saved candidate with ID)
    public Candidate addCandidate(Long electionId, Candidate candidate) {
        Election election = electionRepository.findById(electionId)
                .orElseThrow(() -> new RuntimeException("Election not found with ID: " + electionId));

        candidate.setElection(election); // set relation
        Candidate savedCandidate = candidateRepository.save(candidate); // save candidate separately
        return savedCandidate;
    }

    // Fetch all elections with candidates and vote counts
    public List<Election> getAllElections() {
        List<Election> elections = electionRepository.findAll();
        elections.forEach(this::updateElectionStatus);
        elections.forEach(this::populateVoteCounts);
        return elections;
    }

    // Fetch single election with candidates and vote counts
    public Optional<Election> getElectionById(Long id) {
        Optional<Election> election = electionRepository.findById(id);
        election.ifPresent(this::updateElectionStatus);
        election.ifPresent(this::populateVoteCounts);
        return election;
    }

    // Helper: update election status dynamically
    private void updateElectionStatus(Election election) {
        LocalDateTime now = LocalDateTime.now();
        if (now.isBefore(election.getStartDate())) {
            election.setStatus(ElectionStatus.UPCOMING);
        } else if (now.isAfter(election.getEndDate())) {
            election.setStatus(ElectionStatus.COMPLETED);
        } else {
            election.setStatus(ElectionStatus.ACTIVE);
        }
    }

    // Helper: populate vote counts for each candidate
    private void populateVoteCounts(Election election) {
        for (Candidate candidate : election.getCandidates()) {
            long votes = voteRepository.countByCandidateId(candidate.getId());
            candidate.setVotesCount(votes); // transient field in Candidate
        }
    }
}
