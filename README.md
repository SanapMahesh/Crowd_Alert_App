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


### **Step 3: Backend Setup**
1️⃣ Navigate to Backend Directory
cd backend

2️⃣ Configure Database

Edit the file below:

src/main/resources/application.properties


Add your PostgreSQL configuration:

spring.datasource.url=jdbc:postgresql://localhost:5432/crowdalert
spring.datasource.username=postgres
spring.datasource.password=YOUR_DB_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true


⚠️ Make sure PostgreSQL is running and the crowdalert database exists.

3️⃣ Run Backend Server
mvn spring-boot:run

4️⃣ Backend URL
http://localhost:8080

### **Step 4: Frontend Setup**
1️⃣ Navigate to Frontend Directory
cd frontend

2️⃣ Install Dependencies
npm install

3️⃣ Start Development Server
npm run dev

4️⃣ Frontend URL
http://localhost:5173

### **Step 5: Access & Use the Application**

Open your browser and visit:

http://localhost:5173


Register a new account or log in

Allow location access when prompted

Report incidents directly on the map

View and verify incidents in real time via live updates
