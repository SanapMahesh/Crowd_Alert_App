package com.crowdalert.service;

import com.crowdalert.model.Incident;
import com.crowdalert.model.User;
import com.crowdalert.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SmsService {

    @Autowired
    private UserRepository userRepository;

    @Async // Background mein chalega taaki app hang na ho
    public void broadcastAlert(Incident incident) {
        // 1. Database se SABHI users ko nikalo
        List<User> allUsers = userRepository.findAll();

        // 2. Google Maps Link Create karo
        double lat = incident.getLocation().getY();
        double lon = incident.getLocation().getX();
        String mapLink = "https://www.google.com/maps/search/?api=1&query=" + lat + "," + lon;

        // 3. Ek Strong "Help" Message banao
        String message = "🆘 SOS ALERT: " + incident.getType() + " at " + incident.getTitle() + 
                         ". People need help! Location: " + mapLink;

        System.out.println("--------------------------------------------------");
        System.out.println("📢 BROADCASTING TO ALL " + allUsers.size() + " USERS FOR HELP");
        System.out.println("--------------------------------------------------");

        // 4. Har ek user ko loop mein SMS bhejo
        for (User user : allUsers) {
            // Check karein ki user ke paas mobile number hai ya nahi
            if (user.getMobile() != null && user.getMobile().length() >= 10) {
                
                // Khud ko message na bheje (Optional logic)
                if (!user.getUsername().equals(incident.getReporterName())) {
                    sendRealSms(user.getMobile(), message);
                }
            }
        }
        
        System.out.println("✅ ALL ALERTS SENT.");
    }

    private void sendRealSms(String mobile, String message) {
        // Yahan Twilio ya Console Log chalega
        System.out.println("📲 SMS sent to " + mobile + ": " + message);
        
        // Thoda delay taaki console clean dikhe (Simulation only)
        try { Thread.sleep(50); } catch (InterruptedException e) {}
    }
}