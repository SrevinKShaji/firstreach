import React from 'react';
import { Star, Quote, MessageSquare } from 'lucide-react';

export default function SuccessStories() {
  const testimonials = [
    {
      name: 'Dr. Ananya Nair',
      university: 'Cairo University, Egypt',
      text: 'DestNation Education guided me step by step through documentation, NEET qualification score processing, and hostel booking. Cleared FMGE in first attempt!',
      rating: 5,
    },
    {
      name: 'Dr. Kevin Thomas',
      university: 'Tbilisi State Medical University, Georgia',
      text: 'Extremely transparent service. No hidden charges. The team was available 24/7 during my visa processing and arrival in Georgia.',
      rating: 5,
    },
    {
      name: 'Dr. Sneha Patel',
      university: 'Yerevan State Medical University, Armenia',
      text: 'Best experience! Choosing MBBS abroad was daunting until I spoke with DestNation Education counselors. Strongly recommended for pre-med aspirants.',
      rating: 5,
    },
  ];

  return (
    <section className="why-section" style={{ background: '#f8fafc' }}>
      <div className="container">
        <div className="section-header">
          <span className="badge badge-gold">Student Testimonials</span>
          <h2 className="section-title">Student Success Stories</h2>
          <p className="section-subtitle">
            Hear from our proud medical graduates and current students thriving at top foreign medical universities.
          </p>
        </div>

        <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))' }}>
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="stat-card"
              style={{
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
                padding: '2rem',
              }}
            >
              <div>
                <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '1rem', color: '#f59e0b' }}>
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={18} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                  "{item.text}"
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                <strong style={{ display: 'block', fontSize: '1.05rem', color: 'var(--secondary)' }}>{item.name}</strong>
                <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600 }}>{item.university}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
          <a
            href="https://wa.me/971581236700?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20MBBS%20abroad."
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
            style={{ fontSize: '1.05rem', padding: '0.9rem 2.25rem' }}
          >
            <MessageSquare size={20} />
            <span>Join 2,500+ Students — Chat Now</span>
          </a>
        </div>
      </div>
    </section>
  );
}
