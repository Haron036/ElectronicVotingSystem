package com.example.VotingSystem.Repositories;

import com.example.VotingSystem.Entities.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VoteRepository extends JpaRepository<Vote, Long> {

    @Query("SELECT COUNT(v) > 0 FROM Vote v WHERE v.user.id = :userId AND v.election.id = :electionId")
    boolean existsByUserIdAndElectionId(@Param("userId") Long userId, @Param("electionId") Long electionId);

    @Query("SELECT COUNT(v) FROM Vote v WHERE v.candidate.id = :candidateId")
    long countByCandidateId(@Param("candidateId") Long candidateId);

    @Query("SELECT COUNT(v) FROM Vote v WHERE v.user.id = :userId")
    long countByUserId(@Param("userId") Long userId);
    @Query("SELECT v FROM Vote v WHERE v.user.id = :userId ORDER BY v.timestamp DESC")
    List<Vote> findByUserId(@Param("userId") Long userId);





}
