# 🚨 Crowd-Alert  
## Hyperlocal Real-time Incident Response System

![Java](https://img.shields.io/badge/Java-Spring%20Boot-green)
![React](https://img.shields.io/badge/React-Frontend-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-PostGIS-blue)
![WebSocket](https://img.shields.io/badge/WebSocket-Real--Time-orange)

---

## 📌 Project Overview

**Crowd-Alert** is a full-stack community safety platform that enables users to report, track, and verify real-time incidents such as accidents, fires, and traffic issues using an interactive map.  
The system leverages **WebSockets** for real-time synchronization and **PostGIS** for efficient geospatial queries.

---

## 🌟 Key Features

- 📍 Real-time incident mapping using Leaflet
- ⚡ Instant WebSocket updates (STOMP + SockJS)
- 🌍 5 km radius-based geospatial filtering
- ✅ Crowd verification with trust logic (3+ verifications)
- 🔔 In-app alerts and notifications

---

## 🛠️ Tech Stack

### Backend
- Java 17+
- Spring Boot 3.x
- Spring Web, JPA, WebSocket
- PostgreSQL + PostGIS
- Maven

### Frontend
- React.js (Vite)
- Leaflet & React-Leaflet
- SockJS & STOMP.js
- Axios

---

## ⚙️ Setup & Installation

### **Step 1: Install Prerequisites**
Make sure the following tools are installed:
- Java JDK 17+
- Node.js & npm
- PostgreSQL
- PostGIS extension

---

### **Step 2: Create & Configure Database**
Open PostgreSQL (CLI or pgAdmin) and run:
```sql
CREATE DATABASE crowdalert;
\c crowdalert;
CREATE EXTENSION postgis;
Step 3: Backend Setup
Navigate to backend directory:

cd backend
Configure database in
src/main/resources/application.properties:

properties
spring.datasource.url=jdbc:postgresql://localhost:5432/crowdalert
spring.datasource.username=postgres
spring.datasource.password=YOUR_DB_PASSWORD
spring.jpa.hibernate.ddl-auto=update
Run backend server:

mvn spring-boot:run
Backend URL: http://localhost:8080

Step 4: Frontend Setup
Navigate to frontend directory:
cd frontend

Install dependencies and start server:
npm install
npm run dev
Frontend URL: http://localhost:5173

Step 5: Access & Use Application
Open browser and visit http://localhost:5173

Register or login

Allow location access

Report incidents on the map

Verify incidents in real time