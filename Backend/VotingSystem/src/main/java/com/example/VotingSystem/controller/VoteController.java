package com.example.VotingSystem.controller;

import com.example.VotingSystem.DTOs.VoteRequest;
import com.example.VotingSystem.DTOs.VoteResponse;
import com.example.VotingSystem.Entities.Vote;
import com.example.VotingSystem.Security.CustomUserDetails;
import com.example.VotingSystem.Service.VoteService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;

@RestController
@RequestMapping("/api/votes")
public class VoteController {

    private final VoteService voteService;

    public VoteController(VoteService voteService) {
        this.voteService = voteService;
    }

    // Cast vote
    @PostMapping
    public ResponseEntity<VoteResponse> castVote(
            @RequestParam Long userId,
            @RequestBody VoteRequest request
    ) {
        Vote vote = voteService.castVote(
                userId,
                request.getElectionId(),
                request.getCandidateId()
        );

        LocalDateTime localDateTime = vote.getTimestamp();
        OffsetDateTime offsetDateTime = localDateTime.atOffset(ZoneOffset.UTC);

        VoteResponse response = new VoteResponse(
                vote.getId(),
                vote.getUser().getId(),
                vote.getElection().getId(),
                vote.getElection().getTitle(),
                vote.getCandidate().getId(),
                vote.getCandidate().getName(),
                vote.getCandidate().getParty(),
                vote.getCandidate().getPosition(), // ✅
                offsetDateTime
        );

        return ResponseEntity.ok(response);
    }

    // User Receipts
    @GetMapping("/receipts/{userId}")
    public ResponseEntity<List<VoteResponse>> getUserReceipts(@PathVariable Long userId) {
        List<VoteResponse> responses = voteService.getVotesByUser(userId);
        return ResponseEntity.ok(responses);
    }

    // Count votes for a candidate
    @GetMapping("/count/{candidateId}")
    public ResponseEntity<Long> countVotesForCandidate(@PathVariable Long candidateId) {
        long count = voteService.countVotesForCandidate(candidateId);
        return ResponseEntity.ok(count);
    }

    // My Votes (current logged-in user)
    @GetMapping("/my-votes")
    public ResponseEntity<List<VoteResponse>> getMyVotes(Authentication authentication) {
        Long userId = ((CustomUserDetails) authentication.getPrincipal()).getId();
        List<VoteResponse> votes = voteService.getVotesByUser(userId);
        return ResponseEntity.ok(votes);
    }
}
