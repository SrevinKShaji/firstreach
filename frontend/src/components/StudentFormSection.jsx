import React, { useState } from 'react';
import { User, Mail, Phone, Send, CheckCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { createLead } from '../services/api';

export default function StudentFormSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      setErrorMsg('Please fill in all required fields (Name, Email, Phone)');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      await createLead(formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '' });
    } catch (err) {
      console.warn('Backend submit error, using local fallback:', err);
      // Local fallback
      const localData = JSON.parse(localStorage.getItem('destnation_leads') || '[]');
      const newLead = {
        _id: 'lead_' + Date.now(),
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem('destnation_leads', JSON.stringify([newLead, ...localData]));
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="register" className="form-section">
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="section-header">
          <span className="badge badge-gold">
            <Sparkles size={14} /> Student Lead Registration
          </span>
          <h2 className="section-title">Get Free Admission Counseling</h2>
          <p className="section-subtitle">
            Enter your details below to get a direct callback from our senior medical admission advisor.
          </p>
        </div>

        <div className="form-card" style={{ maxWidth: '650px', margin: '0 auto' }}>
          {submitted ? (
            <div
              style={{
                textAlign: 'center',
                padding: '2.5rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: '#f0fdf4',
                  color: '#16a34a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CheckCircle size={36} />
              </div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--secondary)' }}>
                Registration Details Submitted!
              </h3>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: '450px' }}>
                Thank you for expressing interest in DestNation Education. Our admission experts will reach out to you on WhatsApp / Phone shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="btn btn-outline"
                style={{ marginTop: '1rem' }}
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--secondary)' }}>
                  Enter Your Contact Details
                </h3>
               
              </div>

              {errorMsg && (
                <div
                  style={{
                    padding: '0.75rem 1rem',
                    background: '#fef2f2',
                    color: '#991b1b',
                    border: '1px solid #fecaca',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    marginBottom: '1rem',
                    fontWeight: 600,
                  }}
                >
                  {errorMsg}
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter Your Full Name"
                    className="form-input"
                    style={{ paddingLeft: '2.5rem' }}
                    required
                  />
                  <User
                    size={18}
                    color="#94a3b8"
                    style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@gmail.com"
                    className="form-input"
                    style={{ paddingLeft: '2.5rem' }}
                    required
                  />
                  <Mail
                    size={18}
                    color="#94a3b8"
                    style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +91 **********"
                    className="form-input"
                    style={{ paddingLeft: '2.5rem' }}
                    required
                  />
                  <Phone
                    size={18}
                    color="#94a3b8"
                    style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '0.75rem', padding: '0.95rem' }}
                disabled={submitting}
              >
                {submitting ? (
                  <span>Submitting to Database...</span>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Register Details Now</span>
                  </>
                )}
              </button>

              <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                <ShieldCheck size={14} color="#0d9488" />
                <span>Your information is confidential & 100% secure.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
