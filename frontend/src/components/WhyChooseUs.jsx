import React from 'react';
import { Calendar, Users, Stethoscope, Building2, Trophy, MessageSquare } from 'lucide-react';

export default function WhyChooseUs() {
  const stats = [
    {
      icon: <Calendar size={26} />,
      number: '25+',
      label: 'Years of Trusted Experience',
    },
    {
      icon: <Users size={26} />,
      number: '2,500+',
      label: 'Students Enrolled',
    },
    {
      icon: <Stethoscope size={26} />,
      number: '300+',
      label: 'Doctors Educated',
    },
    {
      icon: <Building2 size={26} />,
      number: '35+',
      label: 'Top Universities',
    },
    {
      icon: <Trophy size={26} />,
      number: '#1',
      label: "Kerala's First FMGE Success",
    },
  ];

  return (
    <section id="why-us" className="why-section">
      <div className="container">
        <div className="section-header">
          <span className="badge badge-primary">Proven Excellence</span>
          <h2 className="section-title">Why Choose Us</h2>
          <p className="section-subtitle">
            We provide transparent guidance, end-to-end admission processing, and continuous support throughout your medical study journey.
          </p>
        </div>

        <div className="stats-grid">
          {stats.map((stat, idx) => (
            <div className="stat-card" key={idx}>
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <a
            href="https://wa.me/971581236700?text=Hi%2C%20I%27d%20like%20a%20free%20consultation."
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
          >
            <MessageSquare size={20} />
            <span>Get Free Consultation on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
