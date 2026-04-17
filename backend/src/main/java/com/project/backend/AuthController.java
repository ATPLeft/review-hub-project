package com.project.backend;

import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository repo;

    public AuthController(UserRepository repo) {
        this.repo = repo;
    }

    // ✅ REGISTER API
    @PostMapping("/register")
    public String register(@RequestBody User user) {

        // 🔥 ROLE LOGIC (OPTION B)
        if (user.getEmail().equals("admin@gmail.com")) {
            user.setRole("moderator");   // admin user
        } else {
            user.setRole("user");        // normal user
        }

        repo.save(user);

        return "User registered successfully!";
    }

    // ✅ LOGIN API
    @PostMapping("/login")
    public User login(@RequestBody User loginData) {
        User user = repo.findByEmail(loginData.getEmail());

        if (user != null && user.getPassword().equals(loginData.getPassword())) {
            return user; // ✅ includes role
        }

        throw new RuntimeException("Invalid email or password");
    }
}