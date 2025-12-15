package com.crowdalert.model;

import jakarta.persistence.*;
import lombok.Data;
import org.locationtech.jts.geom.Point;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.time.LocalDateTime;

@Entity

@Table(name = "incidents") // ✅ Ensures table name matches Repository Query
public class Incident {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String type; // e.g., "Traffic", "Hazard"
    private int upvotes = 0;
    private boolean verified = false;

    // ✅ NEW FIELDS: To store who reported it
    private String reporterName;
    private String reporterMobile;

    // Spatial Column (Hidden from JSON to prevent crashes)
    @JsonIgnore
    @Column(columnDefinition = "geometry(Point,4326)")
    private Point location;

    private LocalDateTime createdAt = LocalDateTime.now();

    // ✅ CRITICAL FOR REACT MAP:
    // These methods extract X/Y from the Geometry object so React can read them.
    public double getLatitude() {
        return (location != null) ? location.getY() : 0.0;
    }

    public double getLongitude() {
        return (location != null) ? location.getX() : 0.0;
    }

    // --- Manual Getters/Setters below (Optional if you use @Data) ---
    // Since you have @Data at the top, you don't actually need to write these out!
    // But I will include the new ones just in case you prefer manual code.

    public String getReporterName() {
        return reporterName;
    }

    public void setReporterName(String reporterName) {
        this.reporterName = reporterName;
    }

    public String getReporterMobile() {
        return reporterMobile;
    }

    public void setReporterMobile(String reporterMobile) {
        this.reporterMobile = reporterMobile;
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public int getUpvotes() {
		return upvotes;
	}

	public void setUpvotes(int upvotes) {
		this.upvotes = upvotes;
	}

	public boolean isVerified() {
		return verified;
	}

	public void setVerified(boolean verified) {
		this.verified = verified;
	}

	public Point getLocation() {
		return location;
	}

	public void setLocation(Point location) {
		this.location = location;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
    
    
    
    
    // (You can keep your other manual getters/setters here if you want, 
    // but @Data generates them automatically for you.)
}