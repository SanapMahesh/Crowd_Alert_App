package com.crowdalert.controller;

import com.crowdalert.model.Incident;
import com.crowdalert.model.User;
import com.crowdalert.repository.IncidentRepository;
import com.crowdalert.repository.UserRepository;
import com.crowdalert.service.SmsService; // ✅ IMPORT SMS SERVICE
import org.locationtech.jts.geom.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/incidents")
@CrossOrigin(origins = "http://localhost:5173")
public class IncidentController {

    @Autowired
    private IncidentRepository incidentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private SmsService smsService; // ✅ 1. INJECT SMS SERVICE

    private final GeometryFactory geometryFactory = new GeometryFactory(new PrecisionModel(), 4326);

    @GetMapping
    public List<Incident> getLocalIncidents(@RequestParam double lat, @RequestParam double lon) {
        return incidentRepository.findIncidentsWithinRadius(lat, lon, 5000);
    }

    @PostMapping
    public Incident reportIncident(@RequestBody IncidentDto dto) {
        Incident incident = new Incident();
        incident.setTitle(dto.getTitle());
        incident.setType(dto.getType());

        // Find User
        User reporter = userRepository.findByUsername(dto.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found: " + dto.getUsername()));

        // Auto-fill Name and Mobile
        incident.setReporterName(reporter.getUsername());
        incident.setReporterMobile(reporter.getMobile());

        // Create Location Point
        Point point = geometryFactory.createPoint(new Coordinate(dto.getLongitude(), dto.getLatitude()));
        incident.setLocation(point);

        // Save
        Incident saved = incidentRepository.save(incident);

        // 1. Push to WebSocket (Online Users)
        messagingTemplate.convertAndSend("/topic/incidents", saved);

        // 2. ✅ Push to SMS Service (All Users/Mobile Numbers)
        smsService.broadcastAlert(saved);

        return saved;
    }

    // ✅ DTO Class with Manual Getters/Setters (Safe approach)
    public static class IncidentDto {
        private String title;
        private String type;
        private double latitude;
        private double longitude;
        private String username;

        // --- Getters and Setters ---
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }

        public String getType() { return type; }
        public void setType(String type) { this.type = type; }

        public double getLatitude() { return latitude; }
        public void setLatitude(double latitude) { this.latitude = latitude; }

        public double getLongitude() { return longitude; }
        public void setLongitude(double longitude) { this.longitude = longitude; }
    }
}