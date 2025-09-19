package com.example.VotingSystem.Repositories;

import com.example.VotingSystem.Entities.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CandidateRepository extends JpaRepository<Candidate, Long> {}
