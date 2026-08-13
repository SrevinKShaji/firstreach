import React from 'react';
import { MessageSquare, ShieldCheck, Award, Users, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="container hero-grid">
        <div className="hero-content">
          <div>
            <span className="badge badge-primary mb-3">
              <ShieldCheck size={16} /> NMC & WHO Approved Medical Universities
            </span>
          </div>

          <h1 className="hero-title">
            Study <span className="text-gradient">MBBS Abroad</span> With DestNation Education
          </h1>

          <p className="hero-desc">
            Trusted, transparent, student-first admissions to leading NMC-approved medical universities in <strong>Egypt</strong>, <strong>Georgia</strong>, <strong>Armenia</strong> and <strong>Bulgaria</strong>.
          </p>

          <div className="hero-cta-group">
            <a
              href="https://wa.me/971581236700?text=Hi%2C%20I%27m%20interested%20in%20MBBS%20abroad%20admissions."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              <MessageSquare size={20} />
              <span>Chat on WhatsApp Now</span>
            </a>

            <a href="#register" className="btn btn-outline">
              <span>Register Details</span>
              <ArrowRight size={18} />
            </a>
          </div>

          <div className="hero-highlights">
            <div className="hero-highlight-item">
              <CheckCircle2 size={18} color="#0d9488" />
              <span>100% English Medium</span>
            </div>
            <div className="hero-highlight-item">
              <CheckCircle2 size={18} color="#0d9488" />
              <span>Direct Admissions</span>
            </div>
            <div className="hero-highlight-item">
              <CheckCircle2 size={18} color="#0d9488" />
              <span>FMGE / NExT Prep</span>
            </div>
          </div>
        </div>

        <div className="hero-card-preview">
          <div className="badge badge-gold mb-3" style={{ marginBottom: '1rem' }}>
            <Award size={16} /> 25+ Years Legacy
          </div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '0.75rem' }}>
            Transforming Aspirations into Medical Careers
          </h3>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Join over 2,500+ successful medical students studying in top government & international universities.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.85rem', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <Users size={24} color="#0d9488" />
              <div>
                <strong style={{ display: 'block', fontSize: '1.1rem', color: 'var(--secondary)' }}>2,500+ Enrolled</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Students guided across 4 countries</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.85rem', background: '#f0fdf4', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
              <ShieldCheck size={24} color="#16a34a" />
              <div>
                <strong style={{ display: 'block', fontSize: '1.1rem', color: '#15803d' }}>Kerala's 1st FMGE Rank</strong>
                <span style={{ fontSize: '0.8rem', color: '#166534' }}>Proven academic track record</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
