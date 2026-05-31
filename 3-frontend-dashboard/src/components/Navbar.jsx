import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Activity, Info, Link as LinkIcon } from 'lucide-react';

const Navbar = () => {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 40px', backgroundColor: '#0c3189', borderBottom: '1px solid #729b4f', color: 'white', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Shield color="#45fba3" size={28} />
        <h2 style={{ margin: 0,color: '#ffffff', letterSpacing: '1px' }}>NETGUARD AI NIPS</h2>
      </div>
      <div style={{ display: 'flex', gap: '30px' }}>
        <Link to="/" style={{ color: '#ffffff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 'bold' }}><Activity size={18}/> Dashboard</Link>
        <Link to="/about" style={{ color: '#ffffff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 'bold' }}><Info size={18}/> About</Link>
        <Link to="/connect" style={{ color: '#ffffff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 'bold' }}><LinkIcon size={18}/> Connect</Link>
      </div>
    </nav>
  );
};

export default Navbar;