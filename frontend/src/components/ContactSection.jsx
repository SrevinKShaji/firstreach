  import React from 'react';
  import { PhoneCall, MessageSquare, Phone, UserCheck, Headset } from 'lucide-react';

  export default function ContactSection() {
    const contacts = [
      {
        region: 'International / UAE Admissions Office',
        number: '+971 58 123 6700',
        whatsappUrl: 'https://wa.me/971581236700',
        callUrl: 'tel:+971581236700',
      },
      {
        region: 'India Admissions Desk',
        number: '+91 8848817920',
        whatsappUrl: 'https://wa.me/918848817920',
        callUrl: 'tel:+918848817920',
      },
    ];

    return (
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-primary">Direct Communication</span>
            <h2 className="section-title">Talk To Us</h2>
            <p className="section-subtitle">
              Connect directly with our senior educational advisors via WhatsApp or phone call.
            </p>
          </div>

          <div className="contact-grid">
            {contacts.map((contact, idx) => (
              <div className="contact-card" key={idx}>
                <div
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'var(--primary-light)',
                    color: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem',
                  }}
                >
                  <Headset size={26} />
                </div>
                <h3 className="contact-card-title">{contact.region}</h3>
                <p style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--secondary)' }}>{contact.number}</p>

                <div className="contact-buttons">
                  <a
                    href={contact.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp btn-sm"
                  >
                    <MessageSquare size={16} />
                    <span>WhatsApp</span>
                  </a>

                  <a href={contact.callUrl} className="btn btn-outline btn-sm">
                    <Phone size={16} />
                    <span>Call</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <a
              href="https://wa.me/971581236700?text=Hi%2C%20I%27d%20like%20to%20talk%20to%20an%20admission%20advisor."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ fontSize: '1.05rem', padding: '0.9rem 2.25rem' }}
            >
              <UserCheck size={20} />
              <span>Chat with Admission Advisor Now</span>
            </a>
          </div>
        </div>
      </section>
    );
  }
