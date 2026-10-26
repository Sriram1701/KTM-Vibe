import React from 'react';
import { ShieldAlert, Cpu, Bluetooth, Navigation, Smartphone, FileText, CheckCircle, AlertOctagon } from 'lucide-react';

export default function TftProtocolGuide() {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px 16px' }}>
      <div style={{ marginBottom: '24px' }}>
        <div className="ktm-badge ktm-badge-orange" style={{ marginBottom: '8px' }}>ARCHITECTURE & HARDWARE SAFETY</div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: '#FFF' }}>
          NAVIGATION & TFT PROTOCOL SPECIFICATION
        </h2>
        <p style={{ color: '#8E95A5', fontSize: '14px', maxWidth: '850px', marginTop: '6px' }}>
          Detailed technical breakdown of the 8-step Navigation and TFT data flow, Google Maps notification parsing, Bluetooth GATT boundaries, and Android permissions architecture.
        </p>
      </div>

      {/* Critical Hardware Feasibility Box */}
      <div style={{
        background: 'rgba(255,59,48,0.06)',
        border: '2px solid rgba(255,59,48,0.4)',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '28px'
      }}>
        <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
          <AlertOctagon size={32} color="#FF3B30" style={{ flexShrink: 0, marginTop: '4px' }} />
          <div>
            <h3 style={{ color: '#FF5247', fontSize: '1.2rem', fontFamily: 'var(--font-heading)', margin: '0 0 6px' }}>
              CRITICAL HARDWARE DEPENDENCY (Master Plan Section 5)
            </h3>
            <p style={{ color: '#DDD', fontSize: '13px', lineHeight: '1.6' }}>
              <strong>Bluetooth pairing does not prove that a factory TFT accepts third-party navigation commands.</strong> 
              Do not guess UUIDs, packet formats, or command bytes. Do not modify ECU/TFT firmware or bypass security. 
              Verify the exact <strong>Duke 160 / Duke 200 / Duke 390</strong> model year, TFT firmware, and an authorized/documented communication interface before committing to real TFT transmission.
            </p>
          </div>
        </div>
      </div>

      {/* 8-Step Navigation & TFT Flow */}
      <div style={{
        background: '#12141A',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '28px'
      }}>
        <h3 style={{ color: '#FFF', fontFamily: 'var(--font-heading)', fontSize: '1.3rem', marginBottom: '16px' }}>
          The 8-Step Navigation & Data Flow Pipeline
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
          {[
            { step: '01', title: 'Select Bike', desc: 'Rider selects active motorcycle profile and model generation from Garage.' },
            { step: '02', title: 'Pair Bluetooth', desc: 'App requests BLUETOOTH_CONNECT & SCAN permissions and bonds with motorcycle BLE.' },
            { step: '03', title: 'Verify Protocol', desc: 'App distinguishes plain Bluetooth connectivity from actual TFT navigation acceptance.' },
            { step: '04', title: 'Start Route', desc: 'Rider initiates destination in Google Maps with active turn navigation.' },
            { step: '05', title: 'Obtain Data', desc: 'Reads permitted notification data via Android NotificationListenerService.' },
            { step: '06', title: 'Parse Safely', desc: 'Safely extracts direction arrow, distance in meters, and road name with regex fallbacks.' },
            { step: '07', title: 'Transmit / Fallback', desc: 'Sends via verified GATT packet IF verified; otherwise switches to phone HUD.' },
            { step: '08', title: 'Report State', desc: 'Honestly displays verified, unverified, or simulated status without false claims.' }
          ].map(s => (
            <div key={s.step} style={{ background: '#181A22', borderRadius: '10px', padding: '14px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ fontSize: '11px', fontWeight: '800', color: '#FF6600', fontFamily: 'var(--font-racing)', marginBottom: '4px' }}>
                STEP {s.step}
              </div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#FFF', marginBottom: '4px' }}>{s.title}</div>
              <div style={{ fontSize: '11px', color: '#8E95A5', lineHeight: '1.4' }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Architecture Comparison */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Google Maps Notification Reader */}
        <div style={{ background: '#12141A', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <Navigation size={22} color="#4285F4" />
            <h4 style={{ color: '#FFF', fontSize: '1.1rem', margin: 0 }}>Google Maps Notification Parser</h4>
          </div>
          <p style={{ fontSize: '12px', color: '#AAA', lineHeight: '1.5', marginBottom: '12px' }}>
            On Android, third-party apps cannot inject into Google Maps internals. KTM Vibe uses the standard Android <code>NotificationListenerService</code> to safely inspect navigation alerts:
          </p>
          <ul style={{ paddingLeft: '18px', fontSize: '12px', color: '#8E95A5', lineHeight: '1.6' }}>
            <li><strong>Extra Title:</strong> Destination or street name (e.g., "Grand Southern Trunk Rd")</li>
            <li><strong>Extra Text:</strong> Turn maneuver (e.g., "In 200 m, turn right")</li>
            <li><strong>Maneuver Regex:</strong> Maps strings to 8 standard icons (straight, turn left, turn right, U-turn, roundabout, fork, merge, arrive)</li>
            <li><strong>Fallback:</strong> When notification is absent, simulated route demo kicks in</li>
          </ul>
        </div>

        {/* Android Foreground Service & Permissions */}
        <div style={{ background: '#12141A', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <Smartphone size={22} color="#00E676" />
            <h4 style={{ color: '#FFF', fontSize: '1.1rem', margin: 0 }}>Android Background & Privacy</h4>
          </div>
          <p style={{ fontSize: '12px', color: '#AAA', lineHeight: '1.5', marginBottom: '12px' }}>
            Fully architected for Google Play store compliance (Android 14/15/16 foreground service types):
          </p>
          <ul style={{ paddingLeft: '18px', fontSize: '12px', color: '#8E95A5', lineHeight: '1.6' }}>
            <li><strong>Foreground Service:</strong> <code>connectedDevice</code> type with ongoing rider notification</li>
            <li><strong>Permissions:</strong> <code>BLUETOOTH_CONNECT</code>, <code>BLUETOOTH_SCAN</code>, <code>ACCESS_FINE_LOCATION</code></li>
            <li><strong>Data Integrity:</strong> No location or trip telemetry transmitted without rider consent</li>
            <li><strong>Account Deletion:</strong> Self-serve cloud data wipe within 24 hours</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
