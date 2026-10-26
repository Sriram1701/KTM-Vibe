import React from 'react';
import { ROADMAP_PHASES } from '../data/mockData';
import { CheckCircle2, Clock, ShieldCheck, FileCode, Smartphone, Globe, Terminal } from 'lucide-react';

export default function RoadmapTracker() {
  const dodItems = [
    { title: 'Google login, logout, and guest rider modes configured', done: true },
    { title: 'Bike profiles persist in local database with multiple-bike garage', done: true },
    { title: 'Bluetooth pairing and reconnect lifecycle handled safely', done: true },
    { title: 'TFT compatibility explicitly marked unknown/unverified where protocol unconfirmed', done: true },
    { title: 'Google Maps navigation notification parser tested with fallback states', done: true },
    { title: 'Simulated navigation mode functional for all bikes during development', done: true },
    { title: 'Ride history, trip stats, mileage & fuel tracker with clear units', done: true },
    { title: 'Service reminders and Emergency SOS with GPS coordinate sharing', done: true },
    { title: 'Responsive companion website built alongside the mobile app', done: true },
    { title: 'Android App Bundle (AAB) & Play Store permission declarations prepared', done: true }
  ];

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px 16px' }}>
      <div style={{ marginBottom: '24px' }}>
        <div className="ktm-badge ktm-badge-orange" style={{ marginBottom: '8px' }}>MASTER EXECUTION PLAN</div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: '#FFF' }}>
          ANTIGRAVITY IDE 10-PHASE ROADMAP & QA MATRIX
        </h2>
        <p style={{ color: '#8E95A5', fontSize: '14px', maxWidth: '800px', marginTop: '6px' }}>
          Track real-time implementation across the 10 phases defined in the KTM Vibe Master Plan. 
          Both Flutter Android Mobile codebase and Vite Web Companion are built side-by-side in this workspace.
        </p>
      </div>

      {/* 10 Phases Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '14px', marginBottom: '32px' }}>
        {ROADMAP_PHASES.map((p, idx) => {
          const isDone = p.status === 'Completed';
          const isInProg = p.status === 'In Progress' || p.status === 'Active';
          return (
            <div
              key={idx}
              style={{
                background: '#12141A',
                border: isDone ? '1px solid rgba(0,230,118,0.3)' : isInProg ? '1px solid rgba(255,102,0,0.4)' : '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px',
                padding: '16px',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#FF6600', fontFamily: 'var(--font-racing)' }}>
                  {p.phase}
                </span>
                <span className={`ktm-badge ${isDone ? 'ktm-badge-green' : isInProg ? 'ktm-badge-orange' : 'ktm-badge-neutral'}`} style={{ fontSize: '9px' }}>
                  {p.status}
                </span>
              </div>
              <h3 style={{ fontSize: '1.1rem', color: '#FFF', fontFamily: 'var(--font-heading)', margin: '0 0 6px' }}>
                {p.title}
              </h3>
              <p style={{ fontSize: '12px', color: '#8E95A5', lineHeight: '1.4' }}>
                {p.detail}
              </p>
            </div>
          );
        })}
      </div>

      {/* Definition of Done Checklist */}
      <div style={{
        background: '#12141A',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '16px',
        padding: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <ShieldCheck size={24} color="#00E676" />
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: '#FFF', margin: 0 }}>
            Master Plan: Definition of Done Verification
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '10px' }}>
          {dodItems.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: 'rgba(255,255,255,0.02)',
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '12px',
                color: item.done ? '#DDD' : '#777'
              }}
            >
              <CheckCircle2 size={16} color={item.done ? '#00E676' : '#555'} style={{ flexShrink: 0 }} />
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Dual Stack Workspace Structure */}
      <div style={{
        marginTop: '24px',
        background: '#0D0E12',
        border: '1px solid rgba(255,102,0,0.2)',
        borderRadius: '14px',
        padding: '20px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '24px',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Smartphone size={32} color="#FF6600" />
          <div>
            <div style={{ fontSize: '14px', fontWeight: '700', color: '#FFF' }}>Android Mobile Engine (Flutter)</div>
            <div style={{ fontSize: '12px', color: '#888' }}>Path: <code style={{ color: '#FF8533' }}>/ktm_vibe_app</code> • Targets Android AAB & Web</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Globe size={32} color="#00E676" />
          <div>
            <div style={{ fontSize: '14px', fontWeight: '700', color: '#FFF' }}>Companion Web Simulator & Hub (React)</div>
            <div style={{ fontSize: '12px', color: '#888' }}>Path: <code style={{ color: '#00E676' }}>/ktm_vibe_web</code> • Real-time side-by-side preview</div>
          </div>
        </div>
      </div>
    </div>
  );
}
