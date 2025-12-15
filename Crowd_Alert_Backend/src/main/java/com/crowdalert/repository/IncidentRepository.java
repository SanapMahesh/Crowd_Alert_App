package com.crowdalert.repository;

import com.crowdalert.model.Incident;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IncidentRepository extends JpaRepository<Incident, Long> {

    // Native Query using PostGIS ST_DWithin (distance in meters)
    // 4326 is the SRID for standard Lat/Long (WGS 84)
	// ✅ CORRECT: "FROM incidents" (Plural)
	@Query(value = "SELECT * FROM incidents i WHERE ST_DWithin(i.location, ST_SetSRID(ST_MakePoint(:lon, :lat), 4326), :radius)", nativeQuery = true)
    List<Incident> findIncidentsWithinRadius(@Param("lat") double lat, 
                                             @Param("lon") double lon, 
                                             @Param("radius") double radiusInMeters);
}