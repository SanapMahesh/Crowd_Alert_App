import React, { useState } from 'react';
import IncidentMap from './components/IncidentMap';
import IncidentForm from './components/IncidentForm';
import LoginPage from './components/LoginPage';
import './App.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(''); // ✅ Store logged-in user
    const [currentPosition, setCurrentPosition] = useState([18.5204, 73.8567]);

    const handleLogin = (username) => {
        setIsLoggedIn(true);
        setCurrentUser(username); // ✅ Save username
    };

    // 1. Show Login if not authenticated
    if (!isLoggedIn) {
        return <LoginPage onLogin={handleLogin} />;
    }

    // 2. Show App if authenticated
    return (
        <div className="app-container">
            <IncidentForm 
                currentPosition={currentPosition} 
                onLocationSelect={setCurrentPosition}
                currentUser={currentUser} // ✅ Pass user to Form
            />
            
            <IncidentMap 
                center={currentPosition} 
                onCenterChange={setCurrentPosition} 
            />
        </div>
    );
}

export default App;