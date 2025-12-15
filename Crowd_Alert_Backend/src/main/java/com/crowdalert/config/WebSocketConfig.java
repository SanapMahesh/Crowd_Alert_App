package com.crowdalert.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic");
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // ✅ CRITICAL FIX: Add .setAllowedOrigins("http://localhost:5173")
        registry.addEndpoint("/ws-crowd-alert")
                .setAllowedOrigins("http://localhost:5173") // Allow Vite frontend
                .withSockJS();
    }
}