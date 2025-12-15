import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = ({ onLogin }) => {
    const [isRegistering, setIsRegistering] = useState(false);
    
    // ✅ FIX 1: Add 'mobile' to state
    const [formData, setFormData] = useState({ username: '', password: '', mobile: '' });
    
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        // ✅ FIX 2: Validate Mobile Number before sending
        if (isRegistering && formData.mobile.length < 10) {
            setMessage("❌ Please enter a valid 10-digit mobile number");
            return;
        }

        const endpoint = isRegistering 
            ? 'http://localhost:8080/api/auth/register' 
            : 'http://localhost:8080/api/auth/login';

        try {
            const res = await axios.post(endpoint, formData);
            
            if (isRegistering) {
                setMessage("✅ Registration Successful! Please Login.");
                setIsRegistering(false); // Switch back to login
            } else {
                // Login Success
                onLogin(res.data.username);
            }
        } catch (error) {
            console.error(error);
            setMessage("❌ " + (error.response?.data?.message || "Operation Failed"));
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="logo-text">🚨 Crowd Alert</h1>
                <p>{isRegistering ? "Create an Account" : "Login to Continue"}</p>
                
                {message && <div style={{ marginBottom: '10px', color: message.startsWith('✅') ? 'green' : 'red' }}>{message}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Username</label>
                        <input 
                            type="text" 
                            name="username"
                            value={formData.username} 
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* ✅ FIX 3: Mobile Input Field (Only shows during Register) */}
                    {isRegistering && (
                        <div className="input-group">
                            <label>Mobile Number</label>
                            <input 
                                type="tel" 
                                name="mobile"
                                placeholder="Enter 10-digit number"
                                value={formData.mobile} 
                                onChange={handleChange}
                                required={isRegistering} // Only required if registering
                            />
                        </div>
                    )}
                    
                    <div className="input-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            name="password"
                            value={formData.password} 
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="login-btn">
                        {isRegistering ? "REGISTER" : "LOGIN"}
                    </button>
                </form>
                
                <div className="login-footer">
                    <p style={{marginBottom: 0}}>
                        {isRegistering ? "Already have an account?" : "New to Crowd Alert?"}
                    </p>
                    <button 
                        onClick={() => { setIsRegistering(!isRegistering); setMessage(''); }}
                        style={{ background: 'none', color: '#007bff', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                    >
                        {isRegistering ? "Login Here" : "Register Now"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;