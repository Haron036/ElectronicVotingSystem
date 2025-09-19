package com.example.VotingSystem.Service;

import com.example.VotingSystem.DTOs.VoteResponse;
import com.example.VotingSystem.Entities.Candidate;
import com.example.VotingSystem.Entities.Election;
import com.example.VotingSystem.Entities.User;
import com.example.VotingSystem.Entities.Vote;
import com.example.VotingSystem.Repositories.CandidateRepository;
import com.example.VotingSystem.Repositories.ElectionRepository;
import com.example.VotingSystem.Repositories.UserRepository;
import com.example.VotingSystem.Repositories.VoteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class VoteService {

    private final VoteRepository voteRepository;
    private final UserRepository userRepository;
    private final ElectionRepository electionRepository;
    private final CandidateRepository candidateRepository;

    public VoteService(VoteRepository voteRepository,
                       UserRepository userRepository,
                       ElectionRepository electionRepository,
                       CandidateRepository candidateRepository) {
        this.voteRepository = voteRepository;
        this.userRepository = userRepository;
        this.electionRepository = electionRepository;
        this.candidateRepository = candidateRepository;
    }

    // Cast a vote
    public Vote castVote(Long userId, Long electionId, Long candidateId) {
        if (voteRepository.existsByUserIdAndElectionId(userId, electionId)) {
            throw new RuntimeException("User has already voted in this election");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Election election = electionRepository.findById(electionId)
                .orElseThrow(() -> new RuntimeException("Election not found"));

        Candidate candidate = candidateRepository.findById(candidateId)
                .orElseThrow(() -> new RuntimeException("Candidate not found"));

        Vote vote = new Vote();
        vote.setUser(user);
        vote.setElection(election);
        vote.setCandidate(candidate);

        Vote savedVote = voteRepository.save(vote);

        candidate.setVotesCount(voteRepository.countByCandidateId(candidateId));

        return savedVote;
    }

    // Count votes for a candidate
    public long countVotesForCandidate(Long candidateId) {
        return voteRepository.countByCandidateId(candidateId);
    }

    // Get all votes for a user (raw entities)
    public List<Vote> getUserReceipts(Long userId) {
        return voteRepository.findByUserId(userId);
    }

    // Get votes for a user with DTO mapping
    public List<VoteResponse> getVotesByUser(Long userId) {
        return voteRepository.findByUserId(userId).stream()
                .map(vote -> new VoteResponse(
                        vote.getId(),
                        vote.getUser().getId(),
                        vote.getElection().getId(),
                        vote.getElection().getTitle(),
                        vote.getCandidate().getId(),
                        vote.getCandidate().getName(),
                        vote.getCandidate().getParty(),
                        vote.getCandidate().getPosition(), // ✅
                        vote.getTimestamp()
                ))
                .collect(Collectors.toList());
    }
}
