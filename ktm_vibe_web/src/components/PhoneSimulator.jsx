import React, { useState, useEffect } from 'react';
import {
  Zap, LogIn, Sparkles, Bike, Bluetooth, Gauge, Warehouse, Navigation,
  Activity, TrendingUp, Wrench, MapPin, AlertTriangle, Fuel, CloudRain,
  Compass, Sliders, HelpCircle, Database, Bell, ArrowRight, ArrowLeft,
  ChevronRight, CheckCircle2, ShieldAlert, RefreshCw, Plus, Trash2,
  Share2, Volume2, Shield, Eye, Award, ExternalLink, Play, Pause, CornerUpRight
} from 'lucide-react';

export default function PhoneSimulator({
  currentScreenId,
  setCurrentScreenId,
  activeBike,
  setActiveBike,
  allBikes,
  setAllBikes,
  simNavigation,
  setSimNavigation,
  isBtConnected,
  setIsBtConnected,
  serviceList,
  setServiceList,
  onTriggerSos,
  sosActive,
  setSosActive,
  sosCountdown,
  setSosCountdown
}) {
  // Local state for interactive screens
  const [splashProgress, setSplashProgress] = useState(65);
  const [fuelEntries, setFuelEntries] = useState([
    { id: 1, date: '25 Oct 2026', litres: 10.2, cost: 1050, odo: 14200, mileage: 33.5 },
    { id: 2, date: '18 Oct 2026', litres: 9.8, cost: 1010, odo: 13860, mileage: 34.2 }
  ]);
  const [newLitres, setNewLitres] = useState('');
  const [newCost, setNewCost] = useState('');
  const [newOdo, setNewOdo] = useState('');
  const [simSpeed, setSimSpeed] = useState(74);

  // Auto simulate speed fluctuations in Ride Mode & Nav
  useEffect(() => {
    const timer = setInterval(() => {
      setSimSpeed(prev => Math.min(135, Math.max(55, prev + Math.floor(Math.random() * 5) - 2)));
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  const handleAddFuel = (e) => {
    e.preventDefault();
    if (!newLitres || !newCost || !newOdo) return;
    const l = parseFloat(newLitres);
    const o = parseInt(newOdo);
    const lastOdo = fuelEntries[0]?.odo || (activeBike.odometer - 300);
    const diff = Math.max(10, o - lastOdo);
    const calcMileage = (diff / l).toFixed(1);
    
    setFuelEntries([
      { id: Date.now(), date: 'Just Now', litres: l, cost: parseFloat(newCost), odo: o, mileage: parseFloat(calcMileage) },
      ...fuelEntries
    ]);
    setNewLitres('');
    setNewCost('');
    setNewOdo('');
  };

  const handleResetService = (id) => {
    setServiceList(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status: 'Serviced • Next due in 5,000 km',
          urgent: false,
          percentage: 10,
          dueOdometer: activeBike.odometer + 5000
        };
      }
      return item;
    }));
  };

  return (
    <div className="phone-wrapper" style={{
      width: '380px',
      height: '760px',
      background: '#090A0C',
      borderRadius: '44px',
      border: '10px solid #1C1F26',
      boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 35px rgba(255,102,0,0.2)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
      userSelect: 'none'
    }}>
      {/* Phone Speaker & Dynamic Island */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '110px',
        height: '24px',
        background: '#000000',
        borderRadius: '20px',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 10px'
      }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#1A1A1A' }} />
        <div style={{ width: '38px', height: '4px', borderRadius: '2px', background: '#1c1f24' }} />
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0e1d2c' }} />
      </div>

      {/* Status Bar */}
      <div style={{
        height: '40px',
        padding: '12px 20px 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '11px',
        fontWeight: '700',
        color: '#E0E0E0',
        zIndex: 90,
        fontFamily: 'var(--font-racing)'
      }}>
        <span>14:55</span>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ color: isBtConnected ? '#FF6600' : '#666' }}>
            <Bluetooth size={12} />
          </span>
          <span style={{ fontSize: '10px', color: '#00E676' }}>5G</span>
          <div style={{
            width: '20px',
            height: '10px',
            border: '1px solid #AAA',
            borderRadius: '2px',
            padding: '1px',
            display: 'flex',
            alignItems: 'center'
          }}>
            <div style={{ width: '85%', height: '100%', background: '#FF6600' }} />
          </div>
        </div>
      </div>

      {/* Screen Content Container */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        padding: '10px 16px 20px'
      }}>

        {/* ==================== 01: SPLASH SCREEN ==================== */}
        {currentScreenId === 1 && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
            <div className="pulse-glow" style={{
              width: '90px',
              height: '90px',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, #FF6600 0%, #B34400 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px'
            }}>
              <Bike size={52} color="#FFFFFF" className="bike-float" />
            </div>

            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: '900', letterSpacing: '2px', color: '#FFFFFF', margin: 0 }}>
              KTM <span style={{ color: '#FF6600' }}>VIBE</span>
            </h1>
            <p style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: '#8E95A5', marginTop: '6px', fontFamily: 'var(--font-racing)' }}>
              Ride Smarter • Explore Farther
            </p>

            {/* Racing Trellis frame animation */}
            <div style={{
              width: '100%',
              background: 'rgba(255,102,0,0.08)',
              border: '1px solid rgba(255,102,0,0.2)',
              borderRadius: '12px',
              padding: '16px',
              marginTop: '40px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#FF6600', marginBottom: '6px', fontFamily: 'var(--font-racing)' }}>
                <span>TELEMETRY BOOT</span>
                <span>{splashProgress}%</span>
              </div>
              <div style={{ height: '6px', background: '#1B1E26', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${splashProgress}%`, height: '100%', background: '#FF6600', transition: 'width 0.4s ease' }} />
              </div>
              <div style={{ fontSize: '10px', color: '#888', marginTop: '8px' }}>
                Checking ECU Bluetooth GATT interface...
              </div>
            </div>

            <button
              onClick={() => setCurrentScreenId(2)}
              className="ktm-angle-button"
              style={{
                marginTop: '40px',
                width: '100%',
                padding: '14px',
                background: '#FF6600',
                border: 'none',
                color: '#FFF',
                fontWeight: '800',
                fontSize: '13px',
                cursor: 'pointer',
                fontFamily: 'var(--font-heading)'
              }}
            >
              LAUNCH READY TO RACE &rarr;
            </button>
          </div>
        )}

        {/* ==================== 02: GOOGLE LOGIN ==================== */}
        {currentScreenId === 2 && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <div className="ktm-badge ktm-badge-orange" style={{ marginBottom: '10px' }}>Firebase Auth v10</div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: '#FFF' }}>WELCOME BACK</h2>
              <p style={{ fontSize: '12px', color: '#8E95A5' }}>Sync your motorcycle garage, TFT telemetry & ride trips across devices.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <button
                onClick={() => setCurrentScreenId(3)}
                style={{
                  background: '#FFFFFF',
                  color: '#111',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  fontWeight: '700',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                Continue with Google
              </button>

              <button
                onClick={() => setCurrentScreenId(3)}
                style={{
                  background: '#1A1D24',
                  color: '#FFF',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '14px',
                  fontWeight: '600',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                Rider Guest Mode (Local Only)
              </button>
            </div>

            <div style={{ marginTop: '30px', padding: '14px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', fontSize: '11px', color: '#7E8698' }}>
              <Shield size={14} color="#00E676" style={{ verticalAlign: 'middle', marginRight: '6px' }} />
              End-to-end telemetry encryption. We never sell riding location or speed records.
            </div>
          </div>
        )}

        {/* ==================== 03: WELCOME & ONBOARDING ==================== */}
        {currentScreenId === 3 && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span className="ktm-badge ktm-badge-orange">Step 1 of 3</span>
              <button onClick={() => setCurrentScreenId(4)} style={{ background: 'none', border: 'none', color: '#888', fontSize: '11px', cursor: 'pointer' }}>Skip</button>
            </div>

            <div style={{ textAlign: 'center', margin: '20px 0' }}>
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                margin: '0 auto 16px',
                background: 'radial-gradient(circle, rgba(255,102,0,0.2) 0%, rgba(0,0,0,0) 70%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255,102,0,0.3)'
              }}>
                <Navigation size={48} color="#FF6600" />
              </div>

              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: '#FFF' }}>TFT NAVIGATION</h2>
              <p style={{ fontSize: '12px', color: '#8E95A5', marginTop: '6px' }}>
                Seamless Google Maps turn-by-turn routing projected directly onto your motorcycle's dashboard display.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: 'auto' }}>
              <div style={{ display: 'flex', gap: '10px', padding: '10px', background: '#14161C', borderRadius: '10px', fontSize: '11px', color: '#AAA' }}>
                <CheckCircle2 size={16} color="#FF6600" style={{ flexShrink: 0 }} />
                <span>Bluetooth Low Energy (BLE) background sync</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', padding: '10px', background: '#14161C', borderRadius: '10px', fontSize: '11px', color: '#AAA' }}>
                <CheckCircle2 size={16} color="#FF6600" style={{ flexShrink: 0 }} />
                <span>Automated emergency crash SOS dispatch</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', padding: '10px', background: '#14161C', borderRadius: '10px', fontSize: '11px', color: '#AAA' }}>
                <CheckCircle2 size={16} color="#FF6600" style={{ flexShrink: 0 }} />
                <span>Service alerts & fuel economy tracker</span>
              </div>

              <button
                onClick={() => setCurrentScreenId(4)}
                className="ktm-angle-button"
                style={{
                  marginTop: '16px',
                  padding: '14px',
                  background: '#FF6600',
                  color: '#FFF',
                  border: 'none',
                  fontWeight: '700',
                  fontFamily: 'var(--font-heading)',
                  cursor: 'pointer'
                }}
              >
                SELECT YOUR MOTORCYCLE &rarr;
              </button>
            </div>
          </div>
        )}

        {/* ==================== 04: MODEL SELECTION ==================== */}
        {currentScreenId === 4 && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: '#FFF', marginBottom: '4px' }}>CHOOSE YOUR BIKE</h2>
            <p style={{ fontSize: '11px', color: '#8E95A5', marginBottom: '14px' }}>Select factory model to load correct TFT display protocol.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, overflowY: 'auto' }}>
              {[
                { name: 'KTM 390 Duke', year: '2024 - 2026', badge: 'Verified TFT Gen 3', type: 'duke390' },
                { name: 'KTM RC 390', year: '2022 - 2026', badge: 'Verified TFT', type: 'rc390' },
                { name: 'KTM 250 Adventure', year: '2020 - 2026', badge: 'Partial Guidance', type: 'adv250' },
                { name: 'KTM 160 / 200 Duke', year: '2020 - 2026', badge: 'Simulated Mode Only', type: 'duke160' }
              ].map((b, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setActiveBike(prev => ({ ...prev, model: b.name, year: b.year }));
                    setCurrentScreenId(5);
                  }}
                  style={{
                    padding: '14px',
                    background: activeBike.model.includes(b.name.split(' ')[1]) ? 'rgba(255,102,0,0.15)' : '#14161C',
                    border: activeBike.model.includes(b.name.split(' ')[1]) ? '1px solid #FF6600' : '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '13px', color: '#FFF' }}>{b.name}</div>
                    <div style={{ fontSize: '10px', color: '#888' }}>{b.year}</div>
                  </div>
                  <span className={`ktm-badge ${b.badge.includes('Verified') ? 'ktm-badge-green' : b.badge.includes('Partial') ? 'ktm-badge-orange' : 'ktm-badge-neutral'}`} style={{ fontSize: '9px' }}>
                    {b.badge}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setCurrentScreenId(5)}
              className="ktm-angle-button"
              style={{
                marginTop: '12px',
                padding: '12px',
                background: '#FF6600',
                color: '#FFF',
                border: 'none',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              PROCEED TO BLUETOOTH SETUP &rarr;
            </button>
          </div>
        )}

        {/* ==================== 05: BLUETOOTH SETUP ==================== */}
        {currentScreenId === 5 && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: '#FFF', margin: 0 }}>BLUETOOTH PAIRING</h2>
              <span className={`ktm-badge ${isBtConnected ? 'ktm-badge-green' : 'ktm-badge-orange'}`}>
                {isBtConnected ? 'CONNECTED' : 'DISCONNECTED'}
              </span>
            </div>

            {/* Radar scanner visualization */}
            <div style={{
              height: '140px',
              background: '#0D0E12',
              border: '1px solid rgba(255,102,0,0.2)',
              borderRadius: '14px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              marginBottom: '14px'
            }}>
              <div style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                border: '1px dashed rgba(255,102,0,0.4)',
                position: 'absolute'
              }} />
              <Bluetooth size={32} color={isBtConnected ? '#00E676' : '#FF6600'} className="pulse-glow" />
              <span style={{ fontSize: '10px', color: '#8E95A5', marginTop: '10px', fontFamily: 'var(--font-racing)' }}>
                {isBtConnected ? 'LINK ACTIVE • GATT 0x1800' : 'SCANNING FOR KTM DEVICES...'}
              </span>
            </div>

            <div style={{ fontSize: '11px', fontWeight: '700', color: '#7E8698', marginBottom: '8px', textTransform: 'uppercase' }}>
              Detected Nearby Devices
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, overflowY: 'auto' }}>
              <div style={{
                padding: '12px',
                background: '#14161C',
                border: '1px solid rgba(255,102,0,0.3)',
                borderRadius: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: '#FFF' }}>{activeBike.deviceName}</div>
                  <div style={{ fontSize: '10px', color: '#00E676' }}>RSSI -58 dBm • Verified TFT Gen 3</div>
                </div>
                <button
                  onClick={() => setIsBtConnected(!isBtConnected)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: 'none',
                    background: isBtConnected ? '#FF3B30' : '#FF6600',
                    color: '#FFF',
                    fontWeight: '700',
                    fontSize: '11px',
                    cursor: 'pointer'
                  }}
                >
                  {isBtConnected ? 'Disconnect' : 'Pair'}
                </button>
              </div>

              <div style={{
                padding: '12px',
                background: '#121418',
                borderRadius: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                opacity: 0.6
              }}>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: '#AAA' }}>OBD2_BLE_DONGLE_X</div>
                  <div style={{ fontSize: '10px', color: '#666' }}>RSSI -82 dBm • Generic Serial</div>
                </div>
                <span style={{ fontSize: '10px', color: '#888' }}>Unverified</span>
              </div>
            </div>

            <div style={{
              background: 'rgba(255,179,0,0.08)',
              border: '1px solid rgba(255,179,0,0.2)',
              borderRadius: '8px',
              padding: '10px',
              fontSize: '10px',
              color: '#FFB300',
              marginTop: '10px'
            }}>
              <AlertTriangle size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
              Section 5 Note: Bluetooth pairing alone does not guarantee factory TFT navigation without documented protocol support.
            </div>

            <button
              onClick={() => setCurrentScreenId(6)}
              className="ktm-angle-button"
              style={{
                marginTop: '10px',
                padding: '12px',
                background: '#FF6600',
                color: '#FFF',
                border: 'none',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              GO TO DASHBOARD &rarr;
            </button>
          </div>
        )}

        {/* ==================== 06: HOME DASHBOARD ==================== */}
        {currentScreenId === 6 && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Header with active bike */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '10px', textTransform: 'uppercase', color: '#8E95A5', letterSpacing: '1px', fontFamily: 'var(--font-racing)' }}>ACTIVE MACHINE</div>
                <div style={{ fontSize: '1.2rem', fontWeight: '900', color: '#FFF', fontFamily: 'var(--font-heading)' }}>{activeBike.model}</div>
              </div>
              <button
                onClick={() => setCurrentScreenId(7)}
                style={{
                  background: 'rgba(255,102,0,0.15)',
                  border: '1px solid rgba(255,102,0,0.4)',
                  color: '#FF8533',
                  borderRadius: '8px',
                  padding: '6px 10px',
                  fontSize: '10px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                GARAGE ({allBikes.length})
              </button>
            </div>

            {/* Hero Bike Card */}
            <div style={{
              background: 'linear-gradient(180deg, #181B22 0%, #101217 100%)',
              border: '1px solid rgba(255,102,0,0.3)',
              borderRadius: '16px',
              padding: '16px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span className={`ktm-badge ${isBtConnected ? 'ktm-badge-green' : 'ktm-badge-orange'}`}>
                  {isBtConnected ? 'TFT LINKED' : 'OFFLINE'}
                </span>
                <span style={{ fontSize: '10px', color: '#AAA', fontFamily: 'var(--font-racing)' }}>
                  {activeBike.year} MODEL
                </span>
              </div>

              {/* Graphic Bike Silhouette */}
              <div style={{ textAlign: 'center', margin: '14px 0 8px' }}>
                <Bike size={80} color="#FF6600" className="bike-float" style={{ filter: 'drop-shadow(0 0 15px rgba(255,102,0,0.5))' }} />
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#FFF', marginTop: '4px' }}>
                  "{activeBike.nickname}"
                </div>
              </div>

              {/* Quick Metrics Bar */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '8px',
                background: 'rgba(0,0,0,0.4)',
                borderRadius: '10px',
                padding: '10px',
                marginTop: '10px'
              }}>
                <div>
                  <div style={{ fontSize: '9px', color: '#888' }}>ODOMETER</div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#FFF', fontFamily: 'var(--font-racing)' }}>
                    {activeBike.odometer.toLocaleString()} <span style={{ fontSize: '9px', color: '#FF6600' }}>km</span>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '9px', color: '#888' }}>EST RANGE</div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#00E676', fontFamily: 'var(--font-racing)' }}>
                    240 <span style={{ fontSize: '9px' }}>km</span>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '9px', color: '#888' }}>BATTERY</div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#FFF', fontFamily: 'var(--font-racing)' }}>
                    {activeBike.batteryVoltage} <span style={{ fontSize: '9px', color: '#AAA' }}>V</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Navigation Bar */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <button
                onClick={() => setCurrentScreenId(8)}
                style={{
                  background: '#FF6600',
                  color: '#FFF',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  fontWeight: '800',
                  fontSize: '12px',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-heading)'
                }}
              >
                <Navigation size={16} /> START NAVIGATION
              </button>

              <button
                onClick={() => setCurrentScreenId(16)}
                style={{
                  background: '#1A1D24',
                  color: '#FFF',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  fontWeight: '700',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                <Compass size={16} color="#FF6600" /> RIDE HUD
              </button>
            </div>

            {/* Urgent Maintenance Notice */}
            <div
              onClick={() => setCurrentScreenId(11)}
              style={{
                background: '#181A20',
                borderLeft: '4px solid #FF6600',
                borderRadius: '8px',
                padding: '10px 12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer'
              }}
            >
              <div>
                <div style={{ fontSize: '11px', fontWeight: '700', color: '#FFF' }}>Chain Lube Alert</div>
                <div style={{ fontSize: '10px', color: '#AAA' }}>Due in 220 km (O-ring inspection)</div>
              </div>
              <ChevronRight size={16} color="#FF6600" />
            </div>

            {/* Emergency SOS Shortcut */}
            <button
              onClick={() => setCurrentScreenId(13)}
              style={{
                background: 'rgba(255,59,48,0.1)',
                border: '1px solid rgba(255,59,48,0.3)',
                color: '#FF5247',
                borderRadius: '10px',
                padding: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '11px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              <AlertTriangle size={14} /> EMERGENCY SOS READY (1 CONTACT SET)
            </button>
          </div>
        )}

        {/* ==================== 07: BIKE GARAGE ==================== */}
        {currentScreenId === 7 && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: '#FFF', margin: 0 }}>MY BIKE GARAGE</h2>
              <button
                onClick={() => setCurrentScreenId(4)}
                style={{
                  background: '#FF6600',
                  color: '#FFF',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '6px 10px',
                  fontSize: '11px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Plus size={14} /> Add Bike
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, overflowY: 'auto' }}>
              {allBikes.map(bike => {
                const isSelected = bike.id === activeBike.id;
                return (
                  <div
                    key={bike.id}
                    onClick={() => setActiveBike(bike)}
                    style={{
                      background: isSelected ? 'rgba(255,102,0,0.12)' : '#14161C',
                      border: isSelected ? '1px solid #FF6600' : '1px solid rgba(255,255,255,0.06)',
                      borderRadius: '12px',
                      padding: '14px',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: '800', color: '#FFF' }}>{bike.model}</div>
                        <div style={{ fontSize: '11px', color: '#FF8533' }}>"{bike.nickname}"</div>
                      </div>
                      {isSelected ? (
                        <span className="ktm-badge ktm-badge-orange">ACTIVE</span>
                      ) : (
                        <span style={{ fontSize: '10px', color: '#888' }}>Tap to select</span>
                      )}
                    </div>

                    <div style={{ display: 'flex', gap: '14px', marginTop: '10px', fontSize: '11px', color: '#999' }}>
                      <span>ODO: <strong style={{ color: '#FFF' }}>{bike.odometer.toLocaleString()} km</strong></span>
                      <span>Fuel: <strong style={{ color: '#FFF' }}>{bike.fuelLevel}%</strong></span>
                    </div>

                    <div style={{ fontSize: '10px', color: bike.tftVerified ? '#00E676' : '#FFB300', marginTop: '6px' }}>
                      {bike.tftStatus}
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setCurrentScreenId(6)}
              className="ktm-angle-button"
              style={{
                marginTop: '12px',
                padding: '12px',
                background: '#FF6600',
                color: '#FFF',
                border: 'none',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              SAVE & RETURN TO DASHBOARD
            </button>
          </div>
        )}

        {/* ==================== 08: NAVIGATION COMPANION ==================== */}
        {currentScreenId === 8 && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span className="ktm-badge ktm-badge-green">SIMULATED HUD ACTIVE</span>
              <button
                onClick={() => setSimNavigation(prev => ({
                  ...prev,
                  distanceMeters: prev.distanceMeters > 50 ? prev.distanceMeters - 40 : 250,
                  turnText: prev.distanceMeters > 100 ? 'Turn Right onto GST Road' : 'In 50m, Keep Left at Fork'
                }))}
                style={{
                  background: '#222',
                  border: '1px solid #444',
                  color: '#FF6600',
                  borderRadius: '6px',
                  padding: '4px 8px',
                  fontSize: '9px',
                  cursor: 'pointer'
                }}
              >
                Next Turn &gt;
              </button>
            </div>

            {/* Factory TFT Emulation Box */}
            <div style={{
              background: '#040507',
              border: '2px solid #FF6600',
              borderRadius: '16px',
              padding: '20px',
              textAlign: 'center',
              boxShadow: '0 0 25px rgba(255,102,0,0.35)',
              marginBottom: '14px'
            }}>
              <div style={{ fontSize: '10px', color: '#888', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'var(--font-racing)' }}>
                KTM FACTORY TFT MIRROR
              </div>

              {/* Large Turn Arrow */}
              <div style={{ margin: '14px 0' }}>
                <CornerUpRight size={64} color="#FF6600" strokeWidth={2.5} />
              </div>

              <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#FFF', fontFamily: 'var(--font-racing)', letterSpacing: '1px' }}>
                {simNavigation.distanceMeters} <span style={{ fontSize: '1.2rem', color: '#FF6600' }}>m</span>
              </div>

              <div style={{ fontSize: '14px', fontWeight: '700', color: '#FFF', marginTop: '8px' }}>
                {simNavigation.turnText}
              </div>

              <div style={{ fontSize: '11px', color: '#8E95A5', marginTop: '4px' }}>
                Destination: {simNavigation.destination}
              </div>
            </div>

            {/* Google Maps Notification Reader State */}
            <div style={{
              background: '#13151B',
              borderRadius: '10px',
              padding: '12px',
              fontSize: '11px',
              color: '#BBB',
              marginBottom: '12px'
            }}>
              <div style={{ fontWeight: '700', color: '#FFF', marginBottom: '4px' }}>Android Notification Access</div>
              <div style={{ color: '#8E95A5', fontSize: '10px' }}>
                Reading permitted Google Maps foreground notification. Package: <code style={{ color: '#FF8533' }}>com.google.android.apps.maps</code>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: 'auto' }}>
              <button
                onClick={() => setCurrentScreenId(16)}
                style={{
                  background: '#1F232D',
                  color: '#FFF',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '10px',
                  padding: '10px',
                  fontWeight: '700',
                  fontSize: '11px',
                  cursor: 'pointer'
                }}
              >
                Distraction-Free HUD
              </button>

              <button
                onClick={() => setCurrentScreenId(6)}
                style={{
                  background: '#FF6600',
                  color: '#FFF',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '10px',
                  fontWeight: '700',
                  fontSize: '11px',
                  cursor: 'pointer'
                }}
              >
                Exit Navigation
              </button>
            </div>
          </div>
        )}

        {/* ==================== 09: CONNECTION STATUS ==================== */}
        {currentScreenId === 9 && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: '#FFF', marginBottom: '8px' }}>DIAGNOSTICS & TELEMETRY</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
              <div style={{ padding: '10px', background: '#14161C', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                <span style={{ color: '#888' }}>BLE Protocol State</span>
                <span style={{ color: isBtConnected ? '#00E676' : '#FF3B30', fontWeight: '700' }}>
                  {isBtConnected ? 'GATT_CONNECTED' : 'DISCONNECTED'}
                </span>
              </div>
              <div style={{ padding: '10px', background: '#14161C', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                <span style={{ color: '#888' }}>Signal Strength (RSSI)</span>
                <span style={{ color: '#FFF', fontFamily: 'var(--font-racing)' }}>-62 dBm (Excellent)</span>
              </div>
              <div style={{ padding: '10px', background: '#14161C', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                <span style={{ color: '#888' }}>TFT Firmware Handshake</span>
                <span style={{ color: '#00E676', fontWeight: '700' }}>v2.4.1 Verified</span>
              </div>
              <div style={{ padding: '10px', background: '#14161C', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                <span style={{ color: '#888' }}>Packets Sent / Acknowledged</span>
                <span style={{ color: '#FFF', fontFamily: 'var(--font-racing)' }}>1,842 / 1,842 (0% loss)</span>
              </div>
            </div>

            {/* Raw packet console */}
            <div style={{ fontSize: '10px', color: '#7E8698', marginBottom: '6px', textTransform: 'uppercase', fontFamily: 'var(--font-racing)' }}>
              Live GATT Packet Stream
            </div>
            <div style={{
              flex: 1,
              background: '#07080A',
              border: '1px solid #1C2028',
              borderRadius: '8px',
              padding: '10px',
              fontFamily: 'monospace',
              fontSize: '10px',
              color: '#00E676',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}>
              <div>[TX] 0x01 0x4B 0x54 0x4D_SYNC_ACK</div>
              <div>[RX] 0x02 0xAA 0x12_TFT_HEARTBEAT</div>
              <div>[TX] NAV_STEP: DIST=180M DIR=TURN_RIGHT</div>
              <div>[RX] 0x06 0x00_DISPLAY_UPDATED</div>
              <div style={{ color: '#FFB300' }}>[INFO] Safe fallback: no raw ECU writes attempted.</div>
            </div>

            <button
              onClick={() => setCurrentScreenId(6)}
              className="ktm-angle-button"
              style={{
                marginTop: '10px',
                padding: '12px',
                background: '#FF6600',
                color: '#FFF',
                border: 'none',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              RETURN TO DASHBOARD
            </button>
          </div>
        )}

        {/* ==================== 10: RIDE HISTORY ==================== */}
        {currentScreenId === 10 && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: '#FFF', marginBottom: '10px' }}>RIDE TELEMETRY LOGS</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, overflowY: 'auto' }}>
              {[
                { title: 'ECR Coastal Sunday Blitz', date: 'Yesterday • 48.6 km', time: '42 min', speed: '69.4 km/h avg', top: '142 km/h', lean: '42°' },
                { title: 'Yelagiri Hill Twisties', date: '24 Oct 2026 • 134.2 km', time: '2h 15m', speed: '59.6 km/h avg', top: '138 km/h', lean: '46°' },
                { title: 'Urban Commute', date: '21 Oct 2026 • 18.5 km', time: '28 min', speed: '39.2 km/h avg', top: '88 km/h', lean: '28°' }
              ].map((r, i) => (
                <div key={i} style={{ padding: '12px', background: '#14161C', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ fontWeight: '700', fontSize: '12px', color: '#FFF' }}>{r.title}</div>
                    <span style={{ fontSize: '10px', color: '#FF6600', fontFamily: 'var(--font-racing)', fontWeight: '700' }}>{r.lean} LEAN</span>
                  </div>
                  <div style={{ fontSize: '10px', color: '#888', marginTop: '2px' }}>{r.date} • {r.time}</div>
                  <div style={{ display: 'flex', gap: '12px', marginTop: '8px', fontSize: '10px', color: '#AAA' }}>
                    <span>Avg: <strong style={{ color: '#FFF' }}>{r.speed}</strong></span>
                    <span>Top: <strong style={{ color: '#00E676' }}>{r.top}</strong></span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setCurrentScreenId(6)}
              className="ktm-angle-button"
              style={{
                marginTop: '10px',
                padding: '12px',
                background: '#FF6600',
                color: '#FFF',
                border: 'none',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              BACK TO DASHBOARD
            </button>
          </div>
        )}

        {/* ==================== 11: SERVICE REMINDERS ==================== */}
        {currentScreenId === 11 && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: '#FFF', marginBottom: '8px' }}>SERVICE & MAINTENANCE</h2>
            <div style={{ fontSize: '11px', color: '#888', marginBottom: '12px' }}>Current Odo: {activeBike.odometer.toLocaleString()} km</div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, overflowY: 'auto' }}>
              {serviceList.map(item => (
                <div key={item.id} style={{
                  padding: '12px',
                  background: item.urgent ? 'rgba(255,59,48,0.08)' : '#14161C',
                  border: item.urgent ? '1px solid rgba(255,59,48,0.4)' : '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '10px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ fontSize: '12px', fontWeight: '700', color: '#FFF' }}>{item.title}</div>
                    <span className={`ktm-badge ${item.urgent ? 'ktm-badge-red' : 'ktm-badge-orange'}`} style={{ fontSize: '8px' }}>
                      {item.status}
                    </span>
                  </div>

                  <div style={{ height: '4px', background: '#222', borderRadius: '2px', overflow: 'hidden', margin: '8px 0' }}>
                    <div style={{ width: `${item.percentage}%`, height: '100%', background: item.urgent ? '#FF3B30' : '#FF6600' }} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '10px', color: '#888' }}>Due at {item.dueOdometer.toLocaleString()} km</span>
                    <button
                      onClick={() => handleResetService(item.id)}
                      style={{
                        background: '#222',
                        border: '1px solid #444',
                        color: '#FFF',
                        borderRadius: '4px',
                        padding: '4px 8px',
                        fontSize: '9px',
                        cursor: 'pointer'
                      }}
                    >
                      Mark Serviced
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setCurrentScreenId(6)}
              className="ktm-angle-button"
              style={{
                marginTop: '10px',
                padding: '12px',
                background: '#FF6600',
                color: '#FFF',
                border: 'none',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              SAVE MAINTENANCE SCHEDULE
            </button>
          </div>
        )}

        {/* ==================== 12: FAVOURITE PLACES ==================== */}
        {currentScreenId === 12 && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: '#FFF', marginBottom: '10px' }}>SAVED PLACES</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, overflowY: 'auto' }}>
              {[
                { name: 'Madras Motor Race Track (MMRT)', distance: '38 km', desc: 'Irungattukottai • Weekend Track Day' },
                { name: 'Home Base', distance: '0 km', desc: 'Garaged • Trickle Charger on' },
                { name: 'Yelagiri Hill Climbs', distance: '215 km', desc: 'Twisty hairpin ghat road' },
                { name: 'KTM Authorised Service Centre', distance: '7.4 km', desc: 'KTM Adyar • Motorex Authorized' }
              ].map((place, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setSimNavigation(prev => ({ ...prev, destination: place.name, distanceMeters: 450 }));
                    setCurrentScreenId(8);
                  }}
                  style={{
                    padding: '12px',
                    background: '#14161C',
                    borderRadius: '10px',
                    border: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: '700', color: '#FFF' }}>{place.name}</div>
                    <div style={{ fontSize: '10px', color: '#888' }}>{place.desc}</div>
                  </div>
                  <Navigation size={16} color="#FF6600" />
                </div>
              ))}
            </div>

            <button
              onClick={() => setCurrentScreenId(6)}
              className="ktm-angle-button"
              style={{
                marginTop: '10px',
                padding: '12px',
                background: '#FF6600',
                color: '#FFF',
                border: 'none',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              BACK TO DASHBOARD
            </button>
          </div>
        )}

        {/* ==================== 13: EMERGENCY SOS ==================== */}
        {currentScreenId === 13 && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'rgba(255,59,48,0.15)',
              border: '2px solid #FF3B30',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '10px auto 16px'
            }}>
              <AlertTriangle size={42} color="#FF3B30" />
            </div>

            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: '#FFF', margin: 0 }}>EMERGENCY SOS</h2>
            <p style={{ fontSize: '11px', color: '#AAA', margin: '4px 0 16px' }}>
              Broadcasts your live GPS coordinates to trusted emergency contacts.
            </p>

            {/* Countdown Box */}
            <div style={{
              background: sosActive ? 'rgba(255,59,48,0.2)' : '#14161C',
              border: sosActive ? '2px solid #FF3B30' : '1px solid rgba(255,255,255,0.08)',
              borderRadius: '14px',
              padding: '16px',
              marginBottom: '14px'
            }}>
              {sosActive ? (
                <>
                  <div style={{ fontSize: '11px', color: '#FF3B30', fontWeight: '700' }}>DISPATCHING SOS IN</div>
                  <div style={{ fontSize: '3rem', fontWeight: '900', color: '#FFF', fontFamily: 'var(--font-racing)', margin: '4px 0' }}>
                    {sosCountdown}s
                  </div>
                  <button
                    onClick={() => {
                      setSosActive(false);
                      setSosCountdown(10);
                    }}
                    style={{
                      background: '#FFF',
                      color: '#FF3B30',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '8px 16px',
                      fontWeight: '800',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    I AM OKAY • CANCEL
                  </button>
                </>
              ) : (
                <>
                  <div style={{ fontSize: '12px', color: '#EEE', marginBottom: '10px' }}>
                    Trusted Contact: <strong>Priya (+91 98401 XXXXX)</strong>
                  </div>
                  <button
                    onClick={() => onTriggerSos()}
                    style={{
                      width: '100%',
                      background: '#FF3B30',
                      color: '#FFF',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '12px',
                      fontWeight: '800',
                      fontSize: '13px',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-heading)'
                    }}
                  >
                    TRIGGER EMERGENCY SOS
                  </button>
                </>
              )}
            </div>

            <div style={{ textAlign: 'left', background: '#0D0E12', padding: '10px', borderRadius: '8px', fontSize: '10px', color: '#777' }}>
              <strong>GPS Broadcast SMS Payload:</strong><br />
              "SOS! KTM Vibe Rider crash detected at Lat 12.9716, Lng 80.2433 near East Coast Road. Please send assistance."
            </div>

            <button
              onClick={() => setCurrentScreenId(6)}
              style={{
                marginTop: 'auto',
                background: 'none',
                border: 'none',
                color: '#888',
                fontSize: '12px',
                cursor: 'pointer',
                padding: '10px'
              }}
            >
              Return to Safety
            </button>
          </div>
        )}

        {/* ==================== 14: FUEL & EXPENSE TRACKER ==================== */}
        {currentScreenId === 14 && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: '#FFF', marginBottom: '8px' }}>FUEL & EXPENSES</h2>

            {/* Quick Mileage Stat */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(255,102,0,0.2) 0%, rgba(20,22,28,0.8) 100%)',
              border: '1px solid #FF6600',
              borderRadius: '12px',
              padding: '14px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '12px'
            }}>
              <div>
                <div style={{ fontSize: '10px', color: '#AAA' }}>AVERAGE MILEAGE</div>
                <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#FFF', fontFamily: 'var(--font-racing)' }}>
                  33.8 <span style={{ fontSize: '1rem', color: '#FF6600' }}>km/L</span>
                </div>
              </div>
              <Fuel size={32} color="#FF6600" />
            </div>

            {/* Quick Add Fuel Log */}
            <form onSubmit={handleAddFuel} style={{ background: '#14161C', padding: '10px', borderRadius: '10px', marginBottom: '10px' }}>
              <div style={{ fontSize: '10px', fontWeight: '700', color: '#FF8533', marginBottom: '6px' }}>LOG NEW FUEL STOP</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px', marginBottom: '8px' }}>
                <input
                  type="number"
                  placeholder="Litres"
                  value={newLitres}
                  onChange={e => setNewLitres(e.target.value)}
                  style={{ background: '#0B0C0E', border: '1px solid #333', color: '#FFF', padding: '6px', borderRadius: '4px', fontSize: '10px' }}
                />
                <input
                  type="number"
                  placeholder="Cost (₹)"
                  value={newCost}
                  onChange={e => setNewCost(e.target.value)}
                  style={{ background: '#0B0C0E', border: '1px solid #333', color: '#FFF', padding: '6px', borderRadius: '4px', fontSize: '10px' }}
                />
                <input
                  type="number"
                  placeholder="Odometer"
                  value={newOdo}
                  onChange={e => setNewOdo(e.target.value)}
                  style={{ background: '#0B0C0E', border: '1px solid #333', color: '#FFF', padding: '6px', borderRadius: '4px', fontSize: '10px' }}
                />
              </div>
              <button
                type="submit"
                style={{ width: '100%', background: '#FF6600', color: '#FFF', border: 'none', padding: '6px', borderRadius: '4px', fontWeight: '700', fontSize: '10px', cursor: 'pointer' }}
              >
                + Add Log Entry
              </button>
            </form>

            <div style={{ fontSize: '10px', color: '#7E8698', marginBottom: '6px' }}>PAST ENTRIES</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, overflowY: 'auto' }}>
              {fuelEntries.map(entry => (
                <div key={entry.id} style={{ padding: '8px 10px', background: '#12141A', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', fontSize: '10px' }}>
                  <div>
                    <span style={{ color: '#FFF', fontWeight: '700' }}>{entry.litres} L</span> • <span style={{ color: '#AAA' }}>₹{entry.cost}</span>
                    <div style={{ color: '#777', fontSize: '9px' }}>{entry.date} at {entry.odo} km</div>
                  </div>
                  <span style={{ color: '#00E676', fontWeight: '700', alignSelf: 'center', fontFamily: 'var(--font-racing)' }}>
                    {entry.mileage} km/L
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setCurrentScreenId(6)}
              className="ktm-angle-button"
              style={{
                marginTop: '8px',
                padding: '10px',
                background: '#FF6600',
                color: '#FFF',
                border: 'none',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              BACK TO DASHBOARD
            </button>
          </div>
        )}

        {/* ==================== 15: WEATHER & RAIN ALERTS ==================== */}
        {currentScreenId === 15 && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: '#FFF', marginBottom: '8px' }}>RIDE WEATHER RADAR</h2>

            <div style={{
              background: 'linear-gradient(135deg, rgba(255,102,0,0.15) 0%, rgba(10,12,16,0.9) 100%)',
              border: '1px solid rgba(255,102,0,0.3)',
              borderRadius: '14px',
              padding: '16px',
              textAlign: 'center',
              marginBottom: '12px'
            }}>
              <CloudRain size={42} color="#00E676" style={{ margin: '0 auto 8px' }} />
              <div style={{ fontSize: '2rem', fontWeight: '900', color: '#FFF', fontFamily: 'var(--font-racing)' }}>
                29°C
              </div>
              <div style={{ fontSize: '12px', color: '#00E676', fontWeight: '700' }}>Light Drizzle • 40% Rain Chance</div>
              <div style={{ fontSize: '10px', color: '#888', marginTop: '4px' }}>Wind: 18 km/h NW • Visibility: 8 km</div>
            </div>

            <div style={{
              background: 'rgba(255,179,0,0.1)',
              border: '1px solid rgba(255,179,0,0.3)',
              borderRadius: '10px',
              padding: '12px',
              fontSize: '11px',
              color: '#FFB300',
              marginBottom: '12px'
            }}>
              <strong>Grip Advisory:</strong> Wet asphalt detected along East Coast Road sector. Engage ABS Road Mode and reduce lean angles.
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
              <div style={{ padding: '8px 12px', background: '#14161C', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                <span style={{ color: '#888' }}>Next 2 Hours</span>
                <span style={{ color: '#FFF' }}>31°C • Clear Tarmac</span>
              </div>
              <div style={{ padding: '8px 12px', background: '#14161C', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                <span style={{ color: '#888' }}>Evening 6 PM</span>
                <span style={{ color: '#FF8533' }}>27°C • Thunderstorm Alert (80%)</span>
              </div>
            </div>

            <button
              onClick={() => setCurrentScreenId(6)}
              className="ktm-angle-button"
              style={{
                marginTop: '10px',
                padding: '12px',
                background: '#FF6600',
                color: '#FFF',
                border: 'none',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              BACK TO DASHBOARD
            </button>
          </div>
        )}

        {/* ==================== 16: RIDE MODE HUD ==================== */}
        {currentScreenId === 16 && (
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: '#000000',
            borderRadius: '16px',
            padding: '16px',
            border: '2px solid #FF6600'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="ktm-badge ktm-badge-orange">TRACK HUD MODE</span>
              <span style={{ fontSize: '12px', color: '#00E676', fontFamily: 'var(--font-racing)', fontWeight: '700' }}>GEAR 4</span>
            </div>

            {/* Giant Racing Speedometer */}
            <div style={{ textAlign: 'center', margin: '20px 0' }}>
              <div style={{
                fontSize: '5.5rem',
                fontWeight: '900',
                fontFamily: 'var(--font-racing)',
                color: '#FFFFFF',
                lineHeight: 1,
                textShadow: '0 0 20px rgba(255,102,0,0.6)'
              }}>
                {simSpeed}
              </div>
              <div style={{ fontSize: '14px', letterSpacing: '4px', color: '#FF6600', fontFamily: 'var(--font-racing)', marginTop: '4px' }}>
                KM / H
              </div>
            </div>

            {/* Turn by turn strip */}
            <div style={{
              background: '#111',
              border: '1px solid #333',
              borderRadius: '10px',
              padding: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <CornerUpRight size={32} color="#FF6600" />
              <div>
                <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#FFF', fontFamily: 'var(--font-racing)' }}>
                  {simNavigation.distanceMeters} m
                </div>
                <div style={{ fontSize: '11px', color: '#AAA' }}>{simNavigation.turnText}</div>
              </div>
            </div>

            <button
              onClick={() => setCurrentScreenId(6)}
              style={{
                marginTop: '16px',
                background: '#1F232D',
                color: '#FFF',
                border: 'none',
                borderRadius: '8px',
                padding: '10px',
                fontSize: '11px',
                cursor: 'pointer',
                fontWeight: '700'
              }}
            >
              Exit Ride HUD
            </button>
          </div>
        )}

        {/* ==================== 17: SETTINGS & PRIVACY ==================== */}
        {currentScreenId === 17 && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: '#FFF', marginBottom: '10px' }}>SETTINGS & PRIVACY</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, overflowY: 'auto' }}>
              <div style={{ padding: '12px', background: '#14161C', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', color: '#EEE' }}>Speedometer Units</span>
                <span style={{ fontSize: '11px', color: '#FF6600', fontWeight: '700' }}>km/h</span>
              </div>
              <div style={{ padding: '12px', background: '#14161C', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', color: '#EEE' }}>High-Contrast AMOLED Theme</span>
                <span style={{ fontSize: '11px', color: '#00E676', fontWeight: '700' }}>ENABLED</span>
              </div>
              <div style={{ padding: '12px', background: '#14161C', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', color: '#EEE' }}>Background BLE Service</span>
                <span style={{ fontSize: '11px', color: '#00E676', fontWeight: '700' }}>ACTIVE</span>
              </div>
              <div style={{ padding: '12px', background: '#14161C', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', color: '#EEE' }}>Local Offline Storage Only</span>
                <span style={{ fontSize: '11px', color: '#AAA' }}>Optional Sync</span>
              </div>

              <div style={{ padding: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', fontSize: '10px', color: '#888', marginTop: '10px' }}>
                Complies with Google Play Location & Background Policy 2026. Data deletion available in Screen 19.
              </div>
            </div>

            <button
              onClick={() => setCurrentScreenId(6)}
              className="ktm-angle-button"
              style={{
                marginTop: '10px',
                padding: '12px',
                background: '#FF6600',
                color: '#FFF',
                border: 'none',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              BACK TO DASHBOARD
            </button>
          </div>
        )}

        {/* ==================== 18: HELP & SUPPORT ==================== */}
        {currentScreenId === 18 && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: '#FFF', marginBottom: '8px' }}>HELP & SUPPORT</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, overflowY: 'auto' }}>
              <div style={{ padding: '10px', background: '#14161C', borderRadius: '8px' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', color: '#FF8533' }}>Why does Duke 160 show Simulated Mode?</div>
                <div style={{ fontSize: '10px', color: '#AAA', marginTop: '4px' }}>
                  Per Master Plan Section 5: Bluetooth pairing does not prove factory TFT navigation support. The Duke 160 LCD display does not accept third-party turn-by-turn packets without verified firmware API.
                </div>
              </div>

              <div style={{ padding: '10px', background: '#14161C', borderRadius: '8px' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', color: '#FFF' }}>How to pair with KTM 390 Duke?</div>
                <div style={{ fontSize: '10px', color: '#AAA', marginTop: '4px' }}>
                  Go to Bike Settings Menu &rarr; KTM MY RIDE &rarr; Pairing &rarr; Phone. Confirm 6-digit passkey on screen.
                </div>
              </div>

              <div style={{ padding: '10px', background: '#14161C', borderRadius: '8px' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', color: '#FFF' }}>Does navigation require Google Maps open?</div>
                <div style={{ fontSize: '10px', color: '#AAA', marginTop: '4px' }}>
                  Yes, start navigation in Google Maps. KTM Vibe reads permitted turn prompts and forwards them to your TFT.
                </div>
              </div>
            </div>

            <button
              onClick={() => setCurrentScreenId(6)}
              className="ktm-angle-button"
              style={{
                marginTop: '10px',
                padding: '12px',
                background: '#FF6600',
                color: '#FFF',
                border: 'none',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              BACK TO DASHBOARD
            </button>
          </div>
        )}

        {/* ==================== 19: BACKUP & DATA EXPORT ==================== */}
        {currentScreenId === 19 && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: '#FFF', marginBottom: '8px' }}>BACKUP & DATA PRIVACY</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
              <div style={{ padding: '14px', background: '#14161C', borderRadius: '10px' }}>
                <div style={{ fontSize: '12px', fontWeight: '700', color: '#FFF' }}>Export Local Telemetry Data</div>
                <div style={{ fontSize: '10px', color: '#888', margin: '4px 0 10px' }}>
                  Download all ride logs, fuel entries, and maintenance schedules in JSON/CSV format.
                </div>
                <button
                  onClick={() => alert('Telemetry backup exported: ktm_vibe_backup_2026.json')}
                  style={{
                    background: '#222',
                    border: '1px solid #FF6600',
                    color: '#FF6600',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    fontSize: '11px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  Export JSON Backup
                </button>
              </div>

              <div style={{ padding: '14px', background: 'rgba(255,59,48,0.08)', border: '1px solid rgba(255,59,48,0.2)', borderRadius: '10px' }}>
                <div style={{ fontSize: '12px', fontWeight: '700', color: '#FF5247' }}>Delete Account & All Riding Data</div>
                <div style={{ fontSize: '10px', color: '#AAA', margin: '4px 0 10px' }}>
                  Per Play Store policy: permanently erase your account, garage profiles, and cloud data immediately.
                </div>
                <button
                  onClick={() => alert('Account deletion flow triggered. Data will be purged in 24 hours.')}
                  style={{
                    background: '#FF3B30',
                    color: '#FFF',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    fontSize: '11px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  Request Data Deletion
                </button>
              </div>
            </div>

            <button
              onClick={() => setCurrentScreenId(6)}
              className="ktm-angle-button"
              style={{
                marginTop: '10px',
                padding: '12px',
                background: '#FF6600',
                color: '#FFF',
                border: 'none',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              BACK TO DASHBOARD
            </button>
          </div>
        )}

        {/* ==================== 20: NOTIFICATION CENTRE ==================== */}
        {currentScreenId === 20 && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: '#FFF', marginBottom: '8px' }}>NOTIFICATIONS</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, overflowY: 'auto' }}>
              <div style={{ padding: '10px', background: 'rgba(255,102,0,0.1)', borderLeft: '3px solid #FF6600', borderRadius: '6px' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', color: '#FFF' }}>Maintenance Due Soon</div>
                <div style={{ fontSize: '10px', color: '#BBB' }}>Chain lube check due in 220 km for "{activeBike.nickname}".</div>
                <div style={{ fontSize: '9px', color: '#777', marginTop: '2px' }}>10 mins ago</div>
              </div>

              <div style={{ padding: '10px', background: '#14161C', borderLeft: '3px solid #00E676', borderRadius: '6px' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', color: '#FFF' }}>Bluetooth Reconnected</div>
                <div style={{ fontSize: '10px', color: '#BBB' }}>Successfully linked to {activeBike.deviceName}.</div>
                <div style={{ fontSize: '9px', color: '#777', marginTop: '2px' }}>1 hour ago</div>
              </div>

              <div style={{ padding: '10px', background: 'rgba(255,179,0,0.1)', borderLeft: '3px solid #FFB300', borderRadius: '6px' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', color: '#FFF' }}>Rain Warning Advisory</div>
                <div style={{ fontSize: '10px', color: '#BBB' }}>Thunderstorms expected along ECR corridor at 6 PM.</div>
                <div style={{ fontSize: '9px', color: '#777', marginTop: '2px' }}>2 hours ago</div>
              </div>
            </div>

            <button
              onClick={() => setCurrentScreenId(6)}
              className="ktm-angle-button"
              style={{
                marginTop: '10px',
                padding: '12px',
                background: '#FF6600',
                color: '#FFF',
                border: 'none',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              BACK TO DASHBOARD
            </button>
          </div>
        )}

      </div>

      {/* Phone Bottom Home Bar / Navigation Bar */}
      <div style={{
        height: '46px',
        background: '#0B0C0E',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '0 10px',
        zIndex: 90
      }}>
        <button
          onClick={() => setCurrentScreenId(6)}
          style={{ background: 'none', border: 'none', color: currentScreenId === 6 ? '#FF6600' : '#888', cursor: 'pointer' }}
          title="Home Dashboard"
        >
          <Gauge size={18} />
        </button>
        <button
          onClick={() => setCurrentScreenId(8)}
          style={{ background: 'none', border: 'none', color: currentScreenId === 8 ? '#FF6600' : '#888', cursor: 'pointer' }}
          title="Navigation"
        >
          <Navigation size={18} />
        </button>
        <button
          onClick={() => setCurrentScreenId(7)}
          style={{ background: 'none', border: 'none', color: currentScreenId === 7 ? '#FF6600' : '#888', cursor: 'pointer' }}
          title="Garage"
        >
          <Warehouse size={18} />
        </button>
        <button
          onClick={() => setCurrentScreenId(10)}
          style={{ background: 'none', border: 'none', color: currentScreenId === 10 ? '#FF6600' : '#888', cursor: 'pointer' }}
          title="Ride Telemetry"
        >
          <TrendingUp size={18} />
        </button>
        <button
          onClick={() => setCurrentScreenId(17)}
          style={{ background: 'none', border: 'none', color: currentScreenId === 17 ? '#FF6600' : '#888', cursor: 'pointer' }}
          title="Settings"
        >
          <Sliders size={18} />
        </button>
      </div>

      {/* iOS/Android Home Indicator */}
      <div style={{
        width: '120px',
        height: '4px',
        background: '#444',
        borderRadius: '2px',
        margin: '6px auto',
        opacity: 0.6
      }} />
    </div>
  );
}
