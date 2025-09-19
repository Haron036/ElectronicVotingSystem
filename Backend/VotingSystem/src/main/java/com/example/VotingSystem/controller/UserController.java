package com.example.VotingSystem.controller;

import com.example.VotingSystem.Entities.User;
import com.example.VotingSystem.Repositories.UserRepository;
import com.example.VotingSystem.Repositories.VoteRepository;
import com.example.VotingSystem.Security.CustomUserDetails;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;
    private final VoteRepository voteRepository;

    public UserController(UserRepository userRepository, VoteRepository voteRepository) {
        this.userRepository = userRepository;
        this.voteRepository = voteRepository;
    }

    @GetMapping("/me")
    public User getCurrentUser(Authentication authentication) {
        if (authentication == null) return null;

        CustomUserDetails details = (CustomUserDetails) authentication.getPrincipal();
        User user = details.getUser();

        user.setPassword(null);
        long votesCount = voteRepository.countByUserId(user.getId());
        user.setVotesCount(votesCount);

        return user;
    }

    // ✅ New: update profile
    @PutMapping("/me")
    public User updateCurrentUser(@RequestBody User updatedUser, Authentication authentication) {
        if (authentication == null) return null;

        CustomUserDetails details = (CustomUserDetails) authentication.getPrincipal();
        User user = details.getUser();

        // Update allowed fields
        user.setFirstName(updatedUser.getFirstName());
        user.setLastName(updatedUser.getLastName());
        user.setCounty(updatedUser.getCounty());
        user.setConstituency(updatedUser.getConstituency());

        userRepository.save(user);

        user.setPassword(null); // don’t expose password
        return user;
    }
}
