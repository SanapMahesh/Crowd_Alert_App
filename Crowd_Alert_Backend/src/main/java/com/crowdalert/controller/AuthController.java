package com.crowdalert.controller;


import com.crowdalert.model.User;
import com.crowdalert.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }
        // Optional: Add mobile length validation
        if (user.getMobile() == null || user.getMobile().length() < 10) {
            throw new RuntimeException("Invalid Mobile Number");
        }
        userRepository.save(user);
        return "User Registered Successfully";
    }

    @PostMapping("/login")
    public User login(@RequestBody User user) {
        return userRepository.findByUsername(user.getUsername())
                .filter(u -> u.getPassword().equals(user.getPassword()))
                .orElseThrow(() -> new RuntimeException("Invalid Credentials"));
    }
}