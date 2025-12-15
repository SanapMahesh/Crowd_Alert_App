import React, { useState } from 'react';
import axios from 'axios';

const IncidentForm = ({ currentPosition, onLocationSelect, currentUser }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [formData, setFormData] = useState({ title: '', type: 'Traffic' });

    // --- Search Logic ---
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery) return;
        try {
            const query = `${searchQuery}, India`; 
            const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
            if (response.data && response.data.length > 0) {
                const loc = response.data[0];
                onLocationSelect([parseFloat(loc.lat), parseFloat(loc.lon)]); 
            } else {
                alert("Location not found!");
            }
        } catch (error) { console.error(error); }
    };

    // --- Report Logic ---
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const payload = {
            title: formData.title,
            type: formData.type,
            latitude: currentPosition[0],
            longitude: currentPosition[1],
            username: currentUser // ✅ Sending the username
        };

        try {
            await axios.post('http://localhost:8080/api/incidents', payload);
            alert('Incident Reported Successfully!');
            setFormData({ title: '', type: 'Traffic' });
        } catch (error) {
            console.error("Error reporting:", error);
            alert("Failed to report incident.");
        }
    };

    return (
        <div className="sidebar">
            <div style={{ marginBottom: '20px', borderBottom: '1px solid #ddd', paddingBottom: '20px' }}>
                <h3 style={{marginTop:0}}>🔍 Find Location</h3>
                <div style={{ display: 'flex', gap: '5px' }}>
                    <input 
                        type="text" 
                        placeholder="e.g. Manchar, Pune" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
                    />
                    <button onClick={handleSearch} style={{backgroundColor: '#007bff'}}>GO</button>
                </div>
            </div>

            <h2>📢 Report Incident</h2>
            <p style={{fontSize: '0.9rem', color: '#555', marginBottom: '15px'}}>
                Reporting as: <strong>{currentUser}</strong>
            </p>
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                </div>
                
                <div className="form-group">
                    <label>Type</label>
                    <select name="type" value={formData.type} onChange={handleChange}>
                        <option value="Traffic">🚦 Traffic</option>
                        <option value="Accident">🚑 Accident</option>
                        <option value="Fire">🔥 Fire</option>
                        <option value="Flood">🌊 Flood</option>
                        <option value="Other">❓ Other</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Location</label>
                    <div style={{ fontSize: '12px', color: '#666', background: '#eee', padding: '5px' }}>
                        Lat: {currentPosition[0].toFixed(5)} <br/>
                        Lon: {currentPosition[1].toFixed(5)}
                    </div>
                </div>

                <button type="submit">REPORT ALERT</button>
            </form>
        </div>
    );
};

export default IncidentForm;