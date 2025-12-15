import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import axios from 'axios';

// --- Fix Leaflet Icons ---
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
});
L.Marker.prototype.options.icon = DefaultIcon;

// --- Helper Components ---
const RecenterMap = ({ center }) => {
    const map = useMap();
    useEffect(() => { map.flyTo(center, 14); }, [center, map]);
    return null;
};

const MapCenterTracker = ({ onMove }) => {
    const map = useMapEvents({
        moveend: () => {
            const center = map.getCenter();
            onMove([center.lat, center.lng]);
        },
    });
    return null;
};

const IncidentMap = ({ center, onCenterChange }) => {
    const [incidents, setIncidents] = useState([]);
    
    // ✅ NEW: State for the Alert Banner
    const [alertMsg, setAlertMsg] = useState(null);

    useEffect(() => {
        fetchIncidents();
        
        // Connect to WebSocket
        const stompClient = Stomp.over(() => new SockJS('http://localhost:8080/ws-crowd-alert'));

        stompClient.connect({}, () => {
            stompClient.subscribe('/topic/incidents', (message) => {
                const newIncident = JSON.parse(message.body);
                
                // 1. Add new marker to map
                setIncidents((prev) => [...prev, newIncident]);
                
                // 2. 📢 SHOW ALERT NOTIFICATION TO ALL USERS
                showAlert(`🚨 NEW ALERT: ${newIncident.type} reported in ${newIncident.title}!`);
            });
        }, (err) => console.error(err));

        return () => { if (stompClient) stompClient.disconnect(); };
    }, []);

    // Helper to show alert and hide it after 5 seconds
    const showAlert = (msg) => {
        setAlertMsg(msg);
        setTimeout(() => setAlertMsg(null), 5000); // Auto-hide
    };

    const fetchIncidents = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/incidents?lat=${center[0]}&lon=${center[1]}`);
            setIncidents(res.data);
        } catch (err) { console.error(err); }
    };

    return (
        <div className="map-container">
            
            {/* ✅ NOTIFICATION BANNER COMPONENT */}
            <div className={`notification-banner ${alertMsg ? 'show' : ''}`}>
                <span className="notification-icon">⚠️</span>
                <span>{alertMsg}</span>
            </div>

            <MapContainer center={center} zoom={13} scrollWheelZoom={true}>
                <LayersControl position="topright">
                    <LayersControl.BaseLayer checked name="Satellite View">
                        <TileLayer
                            attribution='Tiles &copy; Esri'
                            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="Street View">
                        <TileLayer
                            attribution='&copy; OpenStreetMap'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    </LayersControl.BaseLayer>
                </LayersControl>

                <RecenterMap center={center} />
                <MapCenterTracker onMove={onCenterChange} />

                <Marker position={center} opacity={0.8}>
                    <Popup>📍 Target Location</Popup>
                </Marker>

                {incidents.map((inc) => (
                    <Marker key={inc.id} position={[inc.latitude, inc.longitude]}>
                        <Popup>
                            <div className="custom-popup">
                                <strong>{inc.title}</strong><br/>
                                <span className={`badge ${inc.type.toLowerCase()}`}>{inc.type}</span><br/>
                                <small>Reported by: {inc.reporterName || "Anonymous"}</small>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default IncidentMap;