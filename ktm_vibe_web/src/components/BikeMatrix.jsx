import React, { useState } from 'react';
import { BIKE_COMPATIBILITY_DATABASE } from '../data/mockData';
import { ShieldCheck, AlertTriangle, HelpCircle, Check, Info } from 'lucide-react';

export default function BikeMatrix({ onSelectBikeForSim }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = BIKE_COMPATIBILITY_DATABASE.filter(item => {
    const matchSearch = item.model.toLowerCase().includes(searchTerm.toLowerCase()) || item.display.toLowerCase().includes(searchTerm.toLowerCase());
    if (filter === 'all') return matchSearch;
    if (filter === 'verified') return matchSearch && item.statusBadge === 'verified';
    if (filter === 'unverified') return matchSearch && (item.statusBadge === 'unverified' || item.statusBadge === 'partial');
    return matchSearch;
  });

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px 16px' }}>
      <div style={{ marginBottom: '24px' }}>
        <div className="ktm-badge ktm-badge-orange" style={{ marginBottom: '8px' }}>HARDWARE FEASIBILITY DATABASE</div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: '#FFF' }}>
          KTM TFT DISPLAY & BLUETOOTH COMPATIBILITY
        </h2>
        <p style={{ color: '#8E95A5', fontSize: '14px', maxWidth: '800px', marginTop: '6px' }}>
          Per <strong>Master Plan Section 5</strong>: Bluetooth pairing does not prove that a factory TFT accepts third-party navigation commands. 
          KTM Vibe explicitly distinguishes verified protocols from unverified hardware to protect rider safety.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search model (e.g. Duke 390, Duke 160, RC, Adventure)..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{
            flex: '1 1 300px',
            background: '#12141A',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '10px',
            padding: '12px 16px',
            color: '#FFF',
            fontSize: '14px',
            outline: 'none'
          }}
        />

        <div style={{ display: 'flex', gap: '8px' }}>
          {['all', 'verified', 'unverified'].map(mode => (
            <button
              key={mode}
              onClick={() => setFilter(mode)}
              style={{
                padding: '10px 16px',
                borderRadius: '8px',
                border: filter === mode ? '1px solid #FF6600' : '1px solid rgba(255,255,255,0.08)',
                background: filter === mode ? 'rgba(255,102,0,0.15)' : '#14161C',
                color: filter === mode ? '#FF8533' : '#8E95A5',
                fontWeight: '700',
                fontSize: '12px',
                cursor: 'pointer',
                textTransform: 'uppercase'
              }}
            >
              {mode} Models
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Bikes */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
        {filtered.map((item, index) => {
          const isVerified = item.statusBadge === 'verified';
          const isPartial = item.statusBadge === 'partial';
          return (
            <div
              key={index}
              style={{
                background: '#12141A',
                border: isVerified ? '1px solid rgba(0,230,118,0.3)' : isPartial ? '1px solid rgba(255,179,0,0.3)' : '1px solid rgba(255,59,48,0.3)',
                borderRadius: '14px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: '#FFF', margin: 0 }}>
                      {item.model}
                    </h3>
                    <div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>
                      Model Years: <span style={{ color: '#DDD' }}>{item.years}</span>
                    </div>
                  </div>
                  <span className={`ktm-badge ${isVerified ? 'ktm-badge-green' : isPartial ? 'ktm-badge-orange' : 'ktm-badge-red'}`}>
                    {item.statusBadge}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', color: '#AAA', marginBottom: '16px' }}>
                  <div>
                    <strong style={{ color: '#EEE' }}>Display Unit:</strong> {item.display}
                  </div>
                  <div>
                    <strong style={{ color: '#EEE' }}>BT Hardware:</strong> {item.btModule}
                  </div>
                  <div>
                    <strong style={{ color: '#EEE' }}>TFT Guidance:</strong>{' '}
                    <span style={{ color: isVerified ? '#00E676' : isPartial ? '#FFB300' : '#FF5247', fontWeight: '700' }}>
                      {item.turnByTurnStatus}
                    </span>
                  </div>
                </div>

                <div style={{
                  background: 'rgba(255,255,255,0.03)',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  fontSize: '11px',
                  color: '#8E95A5',
                  lineHeight: '1.4'
                }}>
                  {item.notes}
                </div>
              </div>

              {onSelectBikeForSim && (
                <button
                  onClick={() => onSelectBikeForSim(item)}
                  style={{
                    marginTop: '16px',
                    width: '100%',
                    background: '#1A1D24',
                    border: '1px solid rgba(255,102,0,0.3)',
                    color: '#FF8533',
                    padding: '8px',
                    borderRadius: '8px',
                    fontSize: '11px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  Test This Model in Phone Simulator &rarr;
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Safety Notice Callout */}
      <div style={{
        marginTop: '32px',
        background: 'rgba(255,102,0,0.06)',
        border: '1px solid rgba(255,102,0,0.3)',
        borderRadius: '16px',
        padding: '20px',
        display: 'flex',
        gap: '16px',
        alignItems: 'center'
      }}>
        <AlertTriangle size={36} color="#FF6600" style={{ flexShrink: 0 }} />
        <div style={{ fontSize: '12px', color: '#AAA', lineHeight: '1.5' }}>
          <strong style={{ color: '#FFF' }}>Critical Hardware Warning:</strong> Never send unverified CAN or GATT commands to a motorcycle ECU or instrument cluster. 
          KTM Vibe guarantees safe fallback: when a motorcycle TFT lacks verified turn-by-turn acceptance, the app runs in <em>Simulated Guidance Mode</em> on the rider's phone or handlebar mount, preventing communication lockups.
        </div>
      </div>
    </div>
  );
}
