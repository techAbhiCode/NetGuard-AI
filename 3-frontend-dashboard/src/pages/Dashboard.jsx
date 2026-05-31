import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ShieldAlert, ShieldCheck, Activity, Server, Unlock } from 'lucide-react';

const Dashboard = () => {
  const [logs, setLogs] = useState([]);
  const [latestStatus, setLatestStatus] = useState("Waiting...");
  const [blacklistedIps, setBlacklistedIps] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch graph logs
        const logsRes = await axios.get('http://localhost:8080/api/v1/network/logs');
        setLogs(logsRes.data);
        if (logsRes.data.length > 0) {
          setLatestStatus(logsRes.data[logsRes.data.length - 1].status);
        }
        
        // Fetch Blocked IPs
        const blacklistRes = await axios.get('http://localhost:8080/api/v1/network/blacklist');
        setBlacklistedIps(blacklistRes.data);
      } catch (error) {
        console.error("Backend connection error");
      }
    };
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  // System Normalization Function (Unblock)
  const handleUnblock = async (ip) => {
    try {
      await axios.post(`http://localhost:8080/api/v1/network/unblock/${ip}`);
      alert(`IP ${ip} has been unblocked. Network restoring...`);
    } catch (error) {
      console.error("Failed to unblock");
    }
  };

  const isAttack = latestStatus === 'Attack';
  const themeColor = isAttack ? '#ef4444' : '#22c55e';

  return (
    <div style={{ padding: '40px', color: 'white' }}>
      
      {/* Header Panel */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: 0 }}><Activity color="#3b82f6"/> Live NIPS Engine</h1>
        <div style={{ padding: '10px 20px', backgroundColor: isAttack ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)', border: `1px solid ${themeColor}`, borderRadius: '10px', color: themeColor }}>
          <h2>{isAttack ? "BREACH DETECTED" : "SYSTEM SECURE"}</h2>
        </div>
      </div>

      {/* Main Graph */}
      <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '15px', height: '350px', marginBottom: '30px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={logs}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="time" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ backgroundColor: '#0f172a' }} />
            <Line type="monotone" dataKey="bytes" stroke="#3b82f6" strokeWidth={3} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Active Threat Mitigation Panel (The NIPS Feature) */}
      <div style={{ backgroundColor: '#450a0a', padding: '20px', borderRadius: '15px', border: '1px solid #dc2626' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fca5a5', marginTop: 0 }}>
          <ShieldAlert /> Active Threat Mitigation (Firewall)
        </h3>
        {blacklistedIps.length === 0 ? (
          <p style={{ color: '#f87171' }}>No threats currently blocked.</p>
        ) : (
          blacklistedIps.map(ip => (
            <div key={ip} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#7f1d1d', padding: '10px 20px', borderRadius: '8px', marginTop: '10px' }}>
              <span style={{ fontWeight: 'bold', letterSpacing: '2px' }}>Blocked IP: {ip}</span>
              <button 
                onClick={() => handleUnblock(ip)}
                style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '8px 15px', backgroundColor: '#22c55e', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                <Unlock size={16} /> Unblock IP
              </button>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default Dashboard;