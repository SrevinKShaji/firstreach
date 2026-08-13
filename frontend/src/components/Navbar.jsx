import React from 'react';
import { GraduationCap, MessageSquare, Lock, ShieldCheck } from 'lucide-react';

export default function Navbar({ onOpenAdmin, isAdminLoggedIn, onOpenAdminDashboard }) {
  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <a href="#" className="brand-logo">
          <div className="brand-icon">
            <GraduationCap size={24} />
          </div>
          <div>
            <div>DestNation Education</div>
            <span className="brand-sub">Study MBBS Abroad</span>
          </div>
        </a>

        <ul className="nav-links">
          <li>
            <a href="#why-us" className="nav-link">Why Choose Us</a>
          </li>
          <li>
            <a href="#register" className="nav-link">Register Details</a>
          </li>
          <li>
            <a href="#destinations" className="nav-link">Top Destinations</a>
          </li>
          <li>
            <a href="#contact" className="nav-link">Talk To Us</a>
          </li>
        </ul>

        <div className="nav-actions">
          {isAdminLoggedIn ? (
            <button onClick={onOpenAdminDashboard} className="btn btn-outline btn-sm" style={{ color: 'var(--primary)', borderColor: 'var(--primary)' }}>
              <ShieldCheck size={16} />
              <span>Admin Dashboard</span>
            </button>
          ) : (
            <button onClick={onOpenAdmin} className="btn btn-outline btn-sm" title="Admin Portal Login">
              <Lock size={15} />
              <span>Admin Login</span>
            </button>
          )}

          <a
            href="https://wa.me/971581236700?text=Hi%2C%20I%27m%20interested%20in%20MBBS%20abroad%20admissions."
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp btn-sm"
          >
            <MessageSquare size={16} />
            <span>WhatsApp Us</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
