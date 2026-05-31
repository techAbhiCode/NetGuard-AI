import React from 'react';

const About = () => {
  return (
    <div style={{ padding: '50px', color: 'white' }}>
      <h1>About Nexus System</h1>
      <p style={{ color: '#94a3b8', fontSize: '18px', lineHeight: '1.6', maxWidth: '800px' }}>
        Nexus is an advanced AI-powered Network Intrusion Prevention System (NIPS). 
        It uses Machine Learning (Random Forest) to analyze network packet flows in real-time, 
        detecting anomalies and mitigating zero-day attacks before they compromise the enterprise network.
      </p>
    </div>
  );
};

export default About;