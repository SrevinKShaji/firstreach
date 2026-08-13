import React from 'react';
import { Globe2, CheckCircle2, MessageSquare, ArrowRight } from 'lucide-react';

export default function TopDestinations() {
  const destinations = [
    {
      country: 'Egypt',
      classStyle: 'dest-egypt',
      badge: 'High Clinical Exposure',
      description: 'Top government medical universities with rich clinical rotation, high hospital patient inflow & NMC compliance.',
      features: ['5+1 Year MBBS Course Structure', 'Top Ranked Medical Universities', 'Affordable Tuition & Hostel Fees', 'High FMGE & USMLE Pass Rate'],
    },
    {
      country: 'Georgia',
      classStyle: 'dest-georgia',
      badge: 'European Standards',
      description: '100% English medium European curriculum medical degrees recognized by WHO, WFME, and ECFMG.',
      features: ['No Entry Entrance Exams', 'Safety Rank #1 in Europe', 'Advanced Medical Simulation Labs', 'Direct Hospital Internships'],
    },
    {
      country: 'Armenia',
      classStyle: 'dest-armenia',
      badge: 'Budget Friendly',
      description: 'Extremely cost-effective medical education with low living costs and welcoming environment for international students.',
      features: ['Affordable Fee Package', 'State Medical Universities', 'English Medium Curriculum', 'Simplified Visa & Admission'],
    },
    {
      country: 'Bulgaria',
      classStyle: 'dest-bulgaria',
      badge: 'EU Recognized Degree',
      description: 'Study MBBS in a full European Union member country with degrees valid across Europe, UK, and India.',
      features: ['EU Medical License Eligibility', 'Modern Research Facilities', 'Diverse International Community', 'NMC & WHO Accredited'],
    },
  ];

  return (
    <section id="destinations" className="destinations-section">
      <div className="container">
        <div className="section-header">
          <span className="badge badge-primary">Global Study Destinations</span>
          <h2 className="section-title">Top Destinations</h2>
          <p className="section-subtitle">
            Explore NMC & WHO approved medical universities across prime study destinations.
          </p>
        </div>

        <div className="destinations-grid">
          {destinations.map((dest, idx) => (
            <div className="destination-card" key={idx}>
              <div className={`destination-header ${dest.classStyle}`}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <Globe2 size={24} />
                  <span className="badge badge-white">{dest.badge}</span>
                </div>
                <h3 className="destination-title">{dest.country}</h3>
              </div>

              <div className="destination-body">
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{dest.description}</p>

                <ul className="dest-feature-list">
                  {dest.features.map((feat, fIdx) => (
                    <li key={fIdx} className="dest-feature-item">
                      <CheckCircle2 size={16} color="#0d9488" style={{ flexShrink: 0 }} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                  <a
                    href={`https://wa.me/971581236700?text=Hi%2C%20I%27d%20like%20to%20explore%20MBBS%20universities%20in%20${dest.country}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <MessageSquare size={16} />
                    <span>Explore {dest.country} on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Callout Box matching demo site */}
        <div
          style={{
            marginTop: '4rem',
            padding: '2.5rem',
            borderRadius: 'var(--radius-lg)',
            background: 'linear-gradient(135deg, #0f172a 0%, #0d9488 100%)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
            boxShadow: 'var(--shadow-xl)',
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.4rem' }}>
              Seats are filling fast at NMC-approved universities for upcoming intake!
            </h3>
            <p style={{ fontSize: '1rem', color: '#94a3b8' }}>
              Reserve your seat early to secure top university admission & early bird fee discounts.
            </p>
          </div>

          <a
            href="https://wa.me/971581236700?text=Hi%2C%20I%27d%20like%20to%20reserve%20my%20seat."
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
            style={{ padding: '0.9rem 2rem', fontSize: '1.05rem' }}
          >
            <MessageSquare size={20} />
            <span>Reserve My Seat on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
