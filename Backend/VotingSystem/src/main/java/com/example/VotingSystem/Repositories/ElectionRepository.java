package com.example.VotingSystem.Repositories;

import com.example.VotingSystem.Entities.Election;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ElectionRepository extends JpaRepository<Election, Long> {}
