
package com.references.preregistration;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;

@SpringBootApplication
public class PreregistrationApp {
    public static void main(String[] args) {
        SpringApplication.run(PreregistrationApp.class, args);
    }
}

// --- ENTITY ---

@Entity
@Table(name = "preregistrations")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
class Preregistration {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}

// --- REPOSITORY ---

interface PreregistrationRepository extends JpaRepository<Preregistration, UUID> {
    boolean existsByEmail(String email);
}

// --- SERVICE ---

@Service
class RegistrationService {
    @Autowired private PreregistrationRepository repository;
    @Autowired private JavaMailSender mailSender;

    public boolean register(String email) {
        if (repository.existsByEmail(email)) {
            return false;
        }
        
        repository.save(Preregistration.builder().email(email).build());
        sendConfirmationEmail(email);
        return true;
    }

    private void sendConfirmationEmail(String to) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("noreply@references.com");
            message.setTo(to);
            message.setSubject("You’re on the References waitlist");
            message.setText("Thank you for registering. We’ll notify you when we launch.\n\nBest,\nThe References Team");
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Failed to send email: " + e.getMessage());
        }
    }
}

// --- CONTROLLER ---

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
class AdminController {
    @Value("${ADMIN_USERNAME:admin}")
    private String adminUsername;

    @Value("${ADMIN_PASSWORD:admin123}")
    private String adminPassword;

    @Autowired private PreregistrationRepository repository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        if (adminUsername.equals(request.getUsername()) && adminPassword.equals(request.getPassword())) {
            return ResponseEntity.ok(new ResponseMessage(true, "Login successful"));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ResponseMessage(false, "Invalid credentials"));
    }

    @GetMapping("/registrations")
    public ResponseEntity<?> getRegistrations(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Basic ")) {
             return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ResponseMessage(false, "Unauthorized"));
        }
        String base64Credentials = authHeader.substring("Basic ".length()).trim();
        byte[] credDecoded = java.util.Base64.getDecoder().decode(base64Credentials);
        String credentials = new String(credDecoded);
        // credentials = username:password
        final String[] values = credentials.split(":", 2);
        if (values.length == 2 && adminUsername.equals(values[0]) && adminPassword.equals(values[1])) {
             return ResponseEntity.ok(repository.findAll());
        }
        
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ResponseMessage(false, "Unauthorized"));
    }
}

@Data
@NoArgsConstructor
@AllArgsConstructor
class LoginRequest {
    private String username;
    private String password;
}

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // For development convenience
class RegistrationController {
    @Autowired private RegistrationService service;

    @PostMapping("/preregister")
    public ResponseEntity<?> preregister(@RequestBody PreregistrationRequest request) {
        boolean success = service.register(request.getEmail());
        if (success) {
            return ResponseEntity.ok(new ResponseMessage(true, "Registration successful."));
        } else {
            return ResponseEntity.badRequest().body(new ResponseMessage(false, "Email already registered."));
        }
    }
}

@Data
@NoArgsConstructor
@AllArgsConstructor
class PreregistrationRequest {
    private String email;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
class ResponseMessage {
    private boolean success;
    private String message;
}
