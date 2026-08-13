import React, { useState, useEffect } from 'react';
import { Database, Search, Trash2, LogOut, RefreshCw, User, Mail, Phone, Calendar, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';
import { fetchLeads, deleteLead, adminLogout } from '../services/api';

export default function AdminDashboard({ adminUser, onLogout }) {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const [dataSource, setDataSource] = useState('mongodb');
  const [toast, setToast] = useState(null);

  const loadLeads = async () => {
    setLoading(true);
    try {
      const res = await fetchLeads();
      if (res && res.data) {
        setLeads(res.data);
        setDataSource(res.source || 'mongodb');
      }
    } catch (err) {
      console.warn('Admin fetch leads error:', err);
      showToast(err.error || 'Failed to fetch MongoDB lead data', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete lead "${name}" from MongoDB database?`)) {
      return;
    }

    setDeletingId(id);
    try {
      await deleteLead(id);
      showToast(`Student record for "${name}" deleted from MongoDB database.`, 'success');
      setLeads((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error('Delete error:', err);
      showToast(err.error || 'Failed to delete record', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const filteredLeads = leads.filter((lead) => {
    const q = searchQuery.toLowerCase();
    return (
      (lead.name && lead.name.toLowerCase().includes(q)) ||
      (lead.email && lead.email.toLowerCase().includes(q)) ||
      (lead.phone && lead.phone.toLowerCase().includes(q))
    );
  });

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '2rem 0 4rem' }}>
      <div className="container">
        {/* Admin Header Top Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'white',
            padding: '1.25rem 2rem',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-md)',
            border: '1px solid var(--border-color)',
            marginBottom: '2rem',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-md)',
                background: 'linear-gradient(135deg, #0f172a 0%, #0d9488 100%)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ShieldCheck size={24} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--secondary)' }}>
                Admin Portal & MongoDB Management
              </h2>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Logged in as <strong>{adminUser?.username || 'Admin'}</strong>
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span className="badge badge-primary">
              <Database size={14} /> Database: {dataSource === 'mongodb' ? 'MongoDB Active' : 'Fallback Mode'}
            </span>

            <button
              onClick={() => {
                adminLogout();
                onLogout();
              }}
              className="btn btn-outline btn-sm"
              style={{ color: '#ef4444', borderColor: '#fecaca' }}
            >
              <LogOut size={16} />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Notifications Toast */}
        {toast && (
          <div
            style={{
              padding: '1rem 1.25rem',
              borderRadius: '12px',
              background: toast.type === 'success' ? '#f0fdf4' : '#fef2f2',
              color: toast.type === 'success' ? '#166534' : '#991b1b',
              border: `1px solid ${toast.type === 'success' ? '#bbf7d0' : '#fecaca'}`,
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontWeight: 600,
              marginBottom: '1.5rem',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            {toast.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
            <span>{toast.message}</span>
          </div>
        )}

        {/* Controls Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            marginBottom: '1.5rem',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexGrow: 1, maxWidth: '450px' }}>
            <div style={{ position: 'relative', width: '100%' }}>
              <input
                type="text"
                placeholder="Search leads by name, email, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '2.5rem', background: 'white' }}
              />
              <Search
                size={18}
                color="#94a3b8"
                style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--secondary)' }}>
              Total Records: <span className="leads-count" style={{ fontSize: '1rem' }}>{filteredLeads.length}</span>
            </span>

            <button onClick={loadLeads} className="btn btn-outline btn-sm" title="Refresh Database Records">
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* MongoDB Leads Data Table */}
        <div
          style={{
            background: 'white',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-xl)',
            border: '1px solid var(--border-color)',
            overflow: 'hidden',
          }}
        >
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-muted)' }}>
              <RefreshCw size={32} className="animate-spin" style={{ margin: '0 auto 1rem', color: 'var(--primary)' }} />
              <p style={{ fontWeight: 600 }}>Fetching student lead records from MongoDB...</p>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-muted)' }}>
              <User size={40} color="#cbd5e1" style={{ marginBottom: '0.75rem' }} />
              <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--secondary)' }}>No Student Leads Found</h4>
              <p style={{ fontSize: '0.9rem', marginTop: '0.25rem' }}>
                {searchQuery ? 'No records match your search criteria.' : 'No student leads registered yet.'}
              </p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <th style={{ padding: '1rem 1.5rem' }}>Student Name</th>
                    <th style={{ padding: '1rem 1.5rem' }}>Email Address</th>
                    <th style={{ padding: '1rem 1.5rem' }}>Phone Number</th>
                    <th style={{ padding: '1rem 1.5rem' }}>Submission Date</th>
                    <th style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>Admin Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr
                      key={lead._id}
                      style={{
                        borderBottom: '1px solid var(--border-color)',
                        transition: 'var(--transition)',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = '#f1f5f9')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      <td style={{ padding: '1.1rem 1.5rem', fontWeight: 700, color: 'var(--secondary)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                          <User size={16} color="var(--primary)" />
                          <span>{lead.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: '1.1rem 1.5rem', color: 'var(--text-muted)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Mail size={15} />
                          <a href={`mailto:${lead.email}`} style={{ color: 'var(--primary)', fontWeight: 500 }}>
                            {lead.email}
                          </a>
                        </div>
                      </td>
                      <td style={{ padding: '1.1rem 1.5rem', color: 'var(--text-muted)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Phone size={15} />
                          <a href={`tel:${lead.phone}`} style={{ color: 'var(--secondary)', fontWeight: 600 }}>
                            {lead.phone}
                          </a>
                        </div>
                      </td>
                      <td style={{ padding: '1.1rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <Calendar size={14} />
                          <span>{new Date(lead.createdAt || Date.now()).toLocaleString()}</span>
                        </div>
                      </td>
                      <td style={{ padding: '1.1rem 1.5rem', textAlign: 'right' }}>
                        <button
                          onClick={() => handleDelete(lead._id, lead.name)}
                          disabled={deletingId === lead._id}
                          className="btn btn-danger btn-sm"
                          style={{ padding: '0.4rem 0.8rem', gap: '0.4rem' }}
                          title="Delete from MongoDB"
                        >
                          <Trash2 size={15} />
                          <span>{deletingId === lead._id ? 'Deleting...' : 'Delete'}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
