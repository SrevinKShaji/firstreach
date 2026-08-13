import React from 'react';
import { GraduationCap, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="brand-icon">
              <GraduationCap size={22} />
            </div>
            <div>
              <span style={{ fontWeight: 800, fontSize: '1.2rem', display: 'block' }}>DestNation Education</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700 }}>Study MBBS Abroad</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.9rem', color: 'var(--text-light)' }}>
            <a href="#why-us">Why Us</a>
            <a href="#register">Register Details</a>
            <a href="#destinations">Destinations</a>
            <a href="#contact">Contact</a>
          </div>
        </div>

        <div className="footer-copy">
          <p>
            © {new Date().getFullYear()} DestNation Education. All Rights Reserved. Student-First Medical Admissions.
          </p>
        </div>
      </div>
    </footer>
  );
}
