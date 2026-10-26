import React, { useState, useEffect } from 'react';
import ktmDukeHero from './assets/ktm_duke_hero.jpg';
import ktmRidingHighway from './assets/ktm_riding_highway.jpg';
import {
  Bluetooth, Navigation, MapPin, Search, Mic, Menu, Bell, Check,
  ChevronRight, ArrowLeft, RefreshCw, Smartphone, Layers, CheckCircle2,
  Compass, Shield, AlertTriangle, CornerUpRight, Wrench, Fuel, CloudRain,
  Sliders, HelpCircle, Database, Plus, Trash2, Maximize2, Minimize2,
  CheckCircle, Radio, X
} from 'lucide-react';

export default function App() {
  // Navigation Flow State
  // 'splash' -> 'onboarding' -> 'login' -> 'selectBike' -> 'bluetoothSetup' -> 'main'
  const [currentFlow, setCurrentFlow] = useState('splash');

  // Bottom Bar Tab in Main: 'dashboard' | 'navigation' | 'garage' | 'settings' | 'help' | 'connectionStatus'
  const [activeTab, setActiveTab] = useState('dashboard');

  // Display Mode: 'phone' (in realistic smartphone frame) | 'fullscreen' (full browser canvas)
  const [viewMode, setViewMode] = useState('phone');

  // Garage Bikes Data
  const [bikes, setBikes] = useState([
    {
      id: 'duke160',
      model: 'Duke 160',
      fullName: 'KTM Duke 160',
      brand: 'KTM',
      year: '2025',
      nickname: 'The Street Fighter',
      connected: true,
      tftSupported: true,
      odometer: 14280,
      image: ktmDukeHero
    },
    {
      id: 'duke250',
      model: 'Duke 250',
      fullName: 'KTM Duke 250',
      brand: 'KTM',
      year: '2024',
      nickname: 'Urban Rebel',
      connected: false,
      tftSupported: true,
      odometer: 6420,
      image: ktmDukeHero
    }
  ]);
  const [activeBike, setActiveBike] = useState(bikes[0]);

  // Bike Selection State
  const [selectedBrand, setSelectedBrand] = useState('KTM');
  const [selectedModel, setSelectedModel] = useState('Duke 160');
  const [selectedYear, setSelectedYear] = useState('2025');

  // Bluetooth State
  const [isBtConnected, setIsBtConnected] = useState(true);
  const [isScanning, setIsScanning] = useState(false);

  // Navigation State
  const [isTftClusterMode, setIsTftClusterMode] = useState(false);
  const [navManeuvers, setNavManeuvers] = useState([
    { dist: '2.0 km', distMeters: 2000, instruction: 'Turn right', road: 'OMR Service Rd', eta: '12 min • 5.8 km • 10:22 AM', speed: 48, gear: 4 },
    { dist: '500 m', distMeters: 500, instruction: 'Keep left at the fork', road: 'Thoraipakkam Radial Rd', eta: '8 min • 3.2 km • 10:26 AM', speed: 64, gear: 5 },
    { dist: '150 m', distMeters: 150, instruction: 'Turn left onto Express Tollway', road: 'IT Highway NH-49A', eta: '4 min • 1.4 km • 10:30 AM', speed: 52, gear: 4 },
    { dist: 'Arrived', distMeters: 0, instruction: 'You have reached your destination', road: 'KTM Experience Center', eta: 'Arrived • 0 min', speed: 0, gear: 1 }
  ]);
  const [maneuverIndex, setManeuverIndex] = useState(0);

  // Add Bike Modal State
  const [showAddBikeModal, setShowAddBikeModal] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [newBikeModel, setNewBikeModel] = useState('Duke 390');
  const [newBikeYear, setNewBikeYear] = useState('2025');
  const [newBikeNickname, setNewBikeNickname] = useState('Beast Mode');

  // Auto transition from Splash after 3.5 seconds (or user can click button)
  useEffect(() => {
    if (currentFlow === 'splash') {
      const timer = setTimeout(() => {
        setCurrentFlow('onboarding');
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [currentFlow]);

  const handleNextManeuver = () => {
    setManeuverIndex((prev) => (prev + 1) % navManeuvers.length);
  };

  const handleConnectBt = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setIsBtConnected(true);
      setCurrentFlow('main');
      setActiveTab('dashboard');
    }, 1200);
  };

  const handleAddBike = (e) => {
    e.preventDefault();
    if (!newBikeModel) return;
    const newBike = {
      id: `bike-${Date.now()}`,
      model: newBikeModel,
      fullName: `KTM ${newBikeModel}`,
      brand: 'KTM',
      year: newBikeYear,
      nickname: newBikeNickname || 'My Machine',
      connected: false,
      tftSupported: true,
      odometer: 120,
      image: ktmDukeHero
    };
    setBikes([newBike, ...bikes]);
    setShowAddBikeModal(false);
  };

  const currentNav = navManeuvers[maneuverIndex];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#07080A',
      color: '#FFFFFF',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'var(--font-body)'
    }}>
      {/* Top Application Control Toolbar for Testing */}
      <div style={{
        background: '#0D0E12',
        borderBottom: '1px solid rgba(255, 102, 0, 0.25)',
        padding: '8px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
        zIndex: 1000
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: '900', fontStyle: 'italic', color: '#FF6600' }}>
            KTM
          </span>
          <span style={{ fontFamily: 'cursive', fontSize: '1.2rem', fontWeight: '700', fontStyle: 'italic', color: '#FF8800' }}>
            Vibe
          </span>
          <span className="ktm-badge ktm-badge-orange" style={{ fontSize: '9px', marginLeft: '6px' }}>
            LIVE WORKING APP
          </span>
        </div>

        {/* Real App Flow Switcher (For easy jumping while paired testing) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '11px', color: '#888', marginRight: '4px' }}>Jump to Flow:</span>
          {[
            { id: 'splash', label: '1. Splash' },
            { id: 'onboarding', label: '12. Onboarding' },
            { id: 'login', label: '2. Login' },
            { id: 'selectBike', label: '3. Select Bike' },
            { id: 'bluetoothSetup', label: '4. Bluetooth' },
            { id: 'main', label: '5. Main App', tab: 'dashboard' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => {
                setCurrentFlow(f.id);
                if (f.tab) setActiveTab(f.tab);
              }}
              style={{
                background: currentFlow === f.id ? '#FF6600' : '#14161C',
                color: currentFlow === f.id ? '#FFF' : '#AAA',
                border: currentFlow === f.id ? '1px solid #FF8533' : '1px solid rgba(255,255,255,0.06)',
                borderRadius: '6px',
                padding: '4px 10px',
                fontSize: '10px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* View mode toggle: Phone simulator vs Fullscreen web app & QR Code */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setShowQrModal(true)}
            style={{
              background: '#FF6600',
              border: 'none',
              color: '#FFF',
              borderRadius: '6px',
              padding: '6px 14px',
              fontSize: '11px',
              fontWeight: '800',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 0 12px rgba(255,102,0,0.4)'
            }}
          >
            <Smartphone size={14} />
            <span>Open on Your Phone (QR Code)</span>
          </button>

          <button
            onClick={() => setViewMode(viewMode === 'phone' ? 'fullscreen' : 'phone')}
            style={{
              background: '#1A1D24',
              border: '1px solid #333',
              color: '#FFF',
              borderRadius: '6px',
              padding: '6px 12px',
              fontSize: '11px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {viewMode === 'phone' ? <Maximize2 size={13} /> : <Minimize2 size={13} />}
            <span>{viewMode === 'phone' ? 'Fullscreen Web Mode' : 'Mobile Phone Frame'}</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Working App Container */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: viewMode === 'phone' ? '24px 16px' : '0'
      }}>
        <div style={{
          width: viewMode === 'phone' ? '400px' : '100%',
          height: viewMode === 'phone' ? '820px' : 'calc(100vh - 46px)',
          background: '#090A0D',
          borderRadius: viewMode === 'phone' ? '44px' : '0',
          border: viewMode === 'phone' ? '10px solid #1C1F26' : 'none',
          boxShadow: viewMode === 'phone' ? '0 30px 80px rgba(0,0,0,0.9), 0 0 35px rgba(255,102,0,0.25)' : 'none',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Top Phone Speaker / Island (Only in Phone mode) */}
          {viewMode === 'phone' && (
            <div style={{
              position: 'absolute',
              top: '8px',
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
          )}

          {/* Status Bar */}
          <div style={{
            height: '38px',
            padding: '10px 20px 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '11px',
            fontWeight: '700',
            color: '#E0E0E0',
            zIndex: 90,
            fontFamily: 'var(--font-racing)'
          }}>
            <span>9:41</span>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ color: isBtConnected ? '#00E676' : '#666' }}>
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
                <div style={{ width: '90%', height: '100%', background: '#FF6600' }} />
              </div>
            </div>
          </div>

          {/* Active Flow Viewport */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', overflowY: 'auto' }}>

            {/* ========================================================= */}
            {/* 1. SPLASH SCREEN */}
            {/* ========================================================= */}
            {currentFlow === 'splash' && (
              <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                padding: '24px',
                background: 'radial-gradient(circle at center, rgba(255,102,0,0.18) 0%, #090A0D 70%)'
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '4px' }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '2.6rem', fontWeight: '900', fontStyle: 'italic', color: '#FF6600' }}>
                    KTM
                  </span>
                  <span style={{ fontFamily: 'cursive', fontSize: '2.4rem', fontWeight: '700', fontStyle: 'italic', color: '#FF8800' }}>
                    Vibe
                  </span>
                </div>
                <div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#8E95A5', marginBottom: '20px' }}>
                  Connect • Ride • Explore
                </div>

                {/* 3D KTM Duke with lighting & embers */}
                <div style={{ position: 'relative', width: '100%', height: '240px', margin: '10px 0' }}>
                  <img
                    src={ktmDukeHero}
                    alt="KTM Duke"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 0 25px rgba(255,102,0,0.5))'
                    }}
                  />
                </div>

                <div style={{ width: '75%', height: '4px', background: '#1A1D24', borderRadius: '2px', overflow: 'hidden', margin: '20px auto 10px' }}>
                  <div style={{ width: '80%', height: '100%', background: '#FF6600', boxShadow: '0 0 10px #FF6600' }} />
                </div>
                <div style={{ fontSize: '11px', color: '#888' }}>
                  Loading your ride experience...
                </div>

                <button
                  onClick={() => setCurrentFlow('onboarding')}
                  className="ktm-angle-button"
                  style={{
                    marginTop: '28px',
                    width: '80%',
                    padding: '12px',
                    background: '#FF6600',
                    border: 'none',
                    color: '#FFF',
                    fontWeight: '800',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  START SETUP &rarr;
                </button>
              </div>
            )}

            {/* ========================================================= */}
            {/* 12. ONBOARDING INTRO (Smart Navigation for your KTM) */}
            {/* ========================================================= */}
            {currentFlow === 'onboarding' && (
              <div style={{
                flex: 1,
                position: 'relative',
                backgroundImage: `url(${ktmRidingHighway})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '24px 20px',
                color: '#FFF'
              }}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(9,10,13,0.7) 0%, rgba(9,10,13,0.2) 40%, rgba(9,10,13,0.95) 100%)',
                  zIndex: 1
                }} />

                <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: '4px' }}>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: '900', fontStyle: 'italic', color: '#FF6600' }}>
                      KTM
                    </span>
                    <span style={{ fontFamily: 'cursive', fontSize: '1.8rem', fontWeight: '700', fontStyle: 'italic', color: '#FF8800' }}>
                      Vibe
                    </span>
                  </div>
                </div>

                <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: '900', color: '#FFF', margin: '0 0 8px' }}>
                    Smart Navigation<br />for Your KTM
                  </h2>
                  <p style={{ fontSize: '12px', color: '#DDD', margin: '0 0 24px', lineHeight: '1.5' }}>
                    Connect your bike, get turn-by-turn navigation on your TFT and ride smarter.
                  </p>

                  <button
                    onClick={() => setCurrentFlow('login')}
                    className="ktm-angle-button"
                    style={{
                      width: '100%',
                      padding: '14px',
                      background: '#FF6600',
                      border: 'none',
                      color: '#FFF',
                      fontWeight: '900',
                      fontSize: '13px',
                      fontFamily: 'var(--font-heading)',
                      cursor: 'pointer'
                    }}
                  >
                    Get Started
                  </button>

                  <button
                    onClick={() => setCurrentFlow('login')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#AAA',
                      fontSize: '12px',
                      cursor: 'pointer',
                      marginTop: '12px'
                    }}
                  >
                    Skip
                  </button>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* 2. GOOGLE LOGIN */}
            {/* ========================================================= */}
            {currentFlow === 'login' && (
              <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                padding: '24px',
                background: 'radial-gradient(circle at bottom, rgba(255,102,0,0.2) 0%, #090A0D 65%)'
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '20px' }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '2.6rem', fontWeight: '900', fontStyle: 'italic', color: '#FF6600' }}>
                    KTM
                  </span>
                  <span style={{ fontFamily: 'cursive', fontSize: '2.4rem', fontWeight: '700', fontStyle: 'italic', color: '#FF8800' }}>
                    Vibe
                  </span>
                </div>

                <div style={{ fontSize: '14px', color: '#EEE', marginBottom: '28px', fontWeight: '600' }}>
                  Sign in with Google<br />to continue
                </div>

                <button
                  onClick={() => setCurrentFlow('selectBike')}
                  style={{
                    background: '#FFFFFF',
                    color: '#1F232D',
                    border: 'none',
                    borderRadius: '24px',
                    padding: '14px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    fontWeight: '700',
                    fontSize: '13px',
                    cursor: 'pointer',
                    width: '100%',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.4)'
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  Continue with Google
                </button>

                <button
                  onClick={() => setCurrentFlow('selectBike')}
                  style={{
                    marginTop: '14px',
                    background: 'transparent',
                    color: '#8E95A5',
                    border: 'none',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  Continue as Guest Rider &rarr;
                </button>

                <div style={{ marginTop: 'auto', fontSize: '9px', color: '#666', lineHeight: '1.4' }}>
                  By continuing, you agree to our<br />Terms & Privacy Policy
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* 3. SELECT YOUR BIKE */}
            {/* ========================================================= */}
            {currentFlow === 'selectBike' && (
              <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: '#FFF', margin: '0 0 2px' }}>
                  Select Your Bike
                </h2>
                <div style={{ fontSize: '11px', color: '#8E95A5', marginBottom: '16px' }}>
                  Choose your KTM bike details
                </div>

                {/* Brand tabs */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                  {['KTM', 'Husqvarna', 'GASGAS'].map(brand => (
                    <button
                      key={brand}
                      onClick={() => setSelectedBrand(brand)}
                      style={{
                        flex: 1,
                        padding: '10px',
                        borderRadius: '8px',
                        border: selectedBrand === brand ? '1px solid #FF6600' : '1px solid rgba(255,255,255,0.08)',
                        background: selectedBrand === brand ? '#FF6600' : '#14161C',
                        color: selectedBrand === brand ? '#FFF' : '#8E95A5',
                        fontWeight: '800',
                        fontSize: '11px',
                        cursor: 'pointer'
                      }}
                    >
                      {brand}
                    </button>
                  ))}
                </div>

                {/* 2x2 Model selection grid */}
                <div style={{ fontSize: '11px', fontWeight: '700', color: '#888', marginBottom: '8px' }}>
                  Model
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
                  {['Duke 160', 'Duke 200', 'Duke 250', 'Duke 390'].map(model => {
                    const isSelected = selectedModel === model;
                    return (
                      <div
                        key={model}
                        onClick={() => setSelectedModel(model)}
                        style={{
                          background: isSelected ? 'rgba(255,102,0,0.15)' : '#14161C',
                          border: isSelected ? '2px solid #FF6600' : '1px solid rgba(255,255,255,0.06)',
                          borderRadius: '12px',
                          padding: '12px',
                          textAlign: 'center',
                          cursor: 'pointer'
                        }}
                      >
                        <img src={ktmDukeHero} alt={model} style={{ width: '80px', height: '55px', objectFit: 'contain', margin: '0 auto' }} />
                        <div style={{ fontSize: '12px', fontWeight: '800', color: '#FFF', marginTop: '6px' }}>
                          {model}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Year pills */}
                <div style={{ fontSize: '11px', fontWeight: '700', color: '#888', marginBottom: '8px' }}>
                  Year
                </div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                  {['2024', '2025', '2026'].map(year => (
                    <button
                      key={year}
                      onClick={() => setSelectedYear(year)}
                      style={{
                        flex: 1,
                        padding: '10px',
                        borderRadius: '8px',
                        border: selectedYear === year ? '1px solid #FF6600' : '1px solid #222',
                        background: selectedYear === year ? '#FF6600' : '#14161C',
                        color: selectedYear === year ? '#FFF' : '#AAA',
                        fontWeight: '800',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      {year}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setActiveBike(prev => ({
                      ...prev,
                      model: selectedModel,
                      fullName: `${selectedBrand} ${selectedModel}`,
                      year: selectedYear
                    }));
                    setCurrentFlow('bluetoothSetup');
                  }}
                  className="ktm-angle-button"
                  style={{
                    marginTop: 'auto',
                    padding: '14px',
                    background: '#FF6600',
                    border: 'none',
                    color: '#FFF',
                    fontWeight: '900',
                    fontSize: '13px',
                    cursor: 'pointer'
                  }}
                >
                  Next
                </button>
              </div>
            )}

            {/* ========================================================= */}
            {/* 4. BLUETOOTH SETUP */}
            {/* ========================================================= */}
            {currentFlow === 'bluetoothSetup' && (
              <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: '#FFF', margin: '0 0 2px' }}>
                  Bluetooth Setup
                </h2>
                <div style={{ fontSize: '11px', color: '#8E95A5', marginBottom: '16px' }}>
                  Pair your bike with the app
                </div>

                {/* Glowing graphic */}
                <div style={{
                  background: '#12141A',
                  border: '1px solid rgba(255,102,0,0.3)',
                  borderRadius: '16px',
                  padding: '16px',
                  textAlign: 'center',
                  marginBottom: '16px',
                  position: 'relative'
                }}>
                  <img src={ktmDukeHero} alt="Bike" style={{ width: '140px', height: '85px', objectFit: 'contain' }} />
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    right: '24px',
                    transform: 'translateY(-50%)',
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    background: 'rgba(255,102,0,0.2)',
                    border: '2px solid #FF6600',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 16px rgba(255,102,0,0.6)'
                  }}>
                    <Bluetooth size={24} color="#FF6600" />
                  </div>
                </div>

                {/* 4 steps */}
                <div style={{ background: '#12141A', borderRadius: '12px', padding: '14px', marginBottom: '16px' }}>
                  <div style={{ fontSize: '12px', color: '#CCC', lineHeight: '1.9' }}>
                    <div>1. Enable Bluetooth</div>
                    <div>2. Allow location & permissions</div>
                    <div>3. Scan for KTM devices</div>
                    <div>4. Pair and connect</div>
                  </div>
                </div>

                {/* Detected card */}
                <div style={{
                  background: '#14161C',
                  border: '1px solid #FF6600',
                  borderRadius: '12px',
                  padding: '14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      background: 'rgba(255,102,0,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Bluetooth size={18} color="#FF6600" />
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: '800', color: '#FFF' }}>
                        KTM_{selectedModel.replace(' ', '_').toUpperCase()}
                      </div>
                      <div style={{ fontSize: '11px', color: '#00E676' }}>Available</div>
                    </div>
                  </div>

                  <button
                    onClick={handleConnectBt}
                    style={{
                      background: '#FF6600',
                      color: '#FFF',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '8px 18px',
                      fontSize: '12px',
                      fontWeight: '800',
                      cursor: 'pointer'
                    }}
                  >
                    {isScanning ? 'Connecting...' : 'Connect'}
                  </button>
                </div>

                <div
                  onClick={() => {
                    setCurrentFlow('main');
                    setActiveTab('help');
                  }}
                  style={{ textAlign: 'center', fontSize: '11px', color: '#FF8533', marginTop: 'auto', cursor: 'pointer' }}
                >
                  Need help? View pairing guide
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* MAIN APP SHELL (Home Dashboard, Nav, Garage, Settings, Help) */}
            {/* ========================================================= */}
            {currentFlow === 'main' && (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

                {/* TAB 1: HOME DASHBOARD */}
                {activeTab === 'dashboard' && (
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px' }}>
                    {/* Header: Menu, Logo, Bell */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <Menu size={20} color="#DDD" style={{ cursor: 'pointer' }} onClick={() => setActiveTab('settings')} />
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: '900', fontStyle: 'italic', color: '#FF6600' }}>
                          KTM
                        </span>
                        <span style={{ fontFamily: 'cursive', fontSize: '1.3rem', fontWeight: '700', fontStyle: 'italic', color: '#FF8800' }}>
                          Vibe
                        </span>
                      </div>
                      <div style={{ position: 'relative' }}>
                        <Bell size={20} color="#DDD" style={{ cursor: 'pointer' }} />
                        <span style={{ position: 'absolute', top: 0, right: 0, width: '7px', height: '7px', borderRadius: '50%', background: '#FF6600' }} />
                      </div>
                    </div>

                    {/* Hero Bike on Pedestal */}
                    <div style={{ position: 'relative', height: '180px', margin: '6px 0 12px', textAlign: 'center' }}>
                      <img
                        src={activeBike.image || ktmDukeHero}
                        alt="Hero Bike"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          filter: 'drop-shadow(0 12px 18px rgba(255,102,0,0.45))'
                        }}
                      />
                    </div>

                    {/* Model Title & Connection */}
                    <div style={{ marginBottom: '12px' }}>
                      <h3 style={{ fontSize: '1.3rem', fontWeight: '900', color: '#FFF', margin: 0, fontFamily: 'var(--font-heading)' }}>
                        {activeBike.model} ({activeBike.year})
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: isBtConnected ? '#00E676' : '#FF3B30', marginTop: '2px' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: isBtConnected ? '#00E676' : '#FF3B30' }} />
                        <span>{isBtConnected ? 'Connected' : 'Disconnected'}</span>
                      </div>
                    </div>

                    {/* Connection Card: Bluetooth Connected + TFT Support */}
                    <div
                      onClick={() => setActiveTab('connectionStatus')}
                      style={{
                        background: '#12141A',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '14px',
                        padding: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        marginBottom: '16px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          background: isBtConnected ? 'rgba(0,230,118,0.15)' : 'rgba(255,59,48,0.15)',
                          border: isBtConnected ? '1px solid #00E676' : '1px solid #FF3B30',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Bluetooth size={18} color={isBtConnected ? '#00E676' : '#FF3B30'} />
                        </div>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: '800', color: '#FFF' }}>
                            {isBtConnected ? 'Bluetooth Connected' : 'Bluetooth Disconnected'}
                          </div>
                          <div style={{ fontSize: '11px', color: '#00E676', fontWeight: '600' }}>
                            TFT Support: Available
                          </div>
                        </div>
                      </div>
                      <ChevronRight size={16} color="#666" />
                    </div>

                    {/* Big Orange Action Button */}
                    <button
                      onClick={() => setActiveTab('navigation')}
                      className="ktm-angle-button"
                      style={{
                        width: '100%',
                        padding: '14px',
                        background: '#FF6600',
                        border: 'none',
                        color: '#FFF',
                        fontWeight: '900',
                        fontSize: '14px',
                        letterSpacing: '0.8px',
                        cursor: 'pointer',
                        fontFamily: 'var(--font-heading)',
                        boxShadow: '0 4px 18px rgba(255,102,0,0.45)'
                      }}
                    >
                      Start Navigation
                    </button>
                  </div>
                )}

                {/* TAB 2: NAVIGATION (Google Maps & TFT Cluster Mirror) */}
                {activeTab === 'navigation' && (
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
                    {/* Header & Mode Switcher */}
                    <div style={{
                      padding: '8px 14px',
                      background: '#101217',
                      borderBottom: '1px solid rgba(255,255,255,0.06)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <ArrowLeft size={16} color="#FFF" style={{ cursor: 'pointer' }} onClick={() => setActiveTab('dashboard')} />
                        <span style={{ fontSize: '13px', fontWeight: '800', color: '#FFF' }}>
                          {isTftClusterMode ? 'FACTORY TFT MIRROR' : 'NAVIGATION (GOOGLE MAPS)'}
                        </span>
                      </div>
                      <button
                        onClick={() => setIsTftClusterMode(!isTftClusterMode)}
                        style={{
                          background: isTftClusterMode ? '#FF6600' : '#1F232D',
                          color: '#FFF',
                          border: 'none',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '10px',
                          fontWeight: '800',
                          cursor: 'pointer'
                        }}
                      >
                        {isTftClusterMode ? 'View Google Maps' : 'Switch to TFT Mirror'}
                      </button>
                    </div>

                    {/* Mode 1: Google Maps Navigation Screen */}
                    {!isTftClusterMode ? (
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        {/* Search bar */}
                        <div style={{
                          padding: '8px 12px',
                          background: '#14161C',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          borderBottom: '1px solid rgba(255,255,255,0.06)'
                        }}>
                          <Search size={16} color="#888" />
                          <span style={{ fontSize: '12px', color: '#777', flex: 1 }}>Search destination (e.g. OMR Service Rd)</span>
                          <Mic size={16} color="#888" />
                        </div>

                        {/* Dark Mode Map Canvas */}
                        <div style={{ flex: 1, background: '#131720', position: 'relative', overflow: 'hidden' }}>
                          {/* Map Roads lines */}
                          <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
                            <path d="M 0 100 L 400 100" stroke="rgba(255,255,255,0.04)" strokeWidth="18" />
                            <path d="M 120 0 L 120 400" stroke="rgba(255,255,255,0.04)" strokeWidth="22" />
                            {/* Blue route polyline */}
                            <path d="M 120 280 L 120 180 Q 120 100 200 100 L 320 100" fill="none" stroke="#4285F4" strokeWidth="8" strokeLinecap="round" />
                            {/* Rider puck */}
                            <circle cx="120" cy="280" r="10" fill="#FF6600" stroke="#FFF" strokeWidth="3" />
                            <circle cx="320" cy="100" r="8" fill="#FF3B30" stroke="#FFF" strokeWidth="2" />
                          </svg>

                          <div style={{ position: 'absolute', bottom: '8px', left: '12px', fontSize: '11px', color: '#555', fontWeight: '800' }}>
                            Google
                          </div>
                        </div>

                        {/* Bottom Turn-by-Turn Card */}
                        <div style={{
                          background: '#101217',
                          borderTop: '2px solid #FF6600',
                          padding: '16px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '6px'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                            <div style={{
                              width: '44px',
                              height: '44px',
                              borderRadius: '50%',
                              background: '#4285F4',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              boxShadow: '0 0 12px rgba(66,133,244,0.5)'
                            }}>
                              <CornerUpRight size={24} color="#FFF" />
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: '15px', fontWeight: '800', color: '#FFF' }}>
                                {currentNav.instruction}
                              </div>
                              <div style={{ fontSize: '13px', color: '#00E676', fontWeight: '700' }}>
                                {currentNav.dist} • {currentNav.road}
                              </div>
                            </div>
                            <button
                              onClick={handleNextManeuver}
                              style={{
                                background: '#1A1D24',
                                border: '1px solid #FF6600',
                                color: '#FF8533',
                                padding: '6px 10px',
                                borderRadius: '6px',
                                fontSize: '10px',
                                fontWeight: '700',
                                cursor: 'pointer'
                              }}
                            >
                              Next Turn &gt;
                            </button>
                          </div>

                          <div style={{ fontSize: '11px', color: '#888', marginTop: '4px' }}>
                            {currentNav.eta}
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Mode 2: Factory KTM TFT Cluster Mirror */
                      <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{
                          background: '#050608',
                          border: '4px solid #2A2E38',
                          borderRadius: '24px',
                          padding: '24px',
                          boxShadow: '0 0 35px rgba(255,102,0,0.3)',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          minHeight: '360px'
                        }}>
                          {/* Turn Guidance Top Banner */}
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{
                              background: 'rgba(66,133,244,0.2)',
                              border: '1px solid #4285F4',
                              borderRadius: '8px',
                              padding: '8px',
                              display: 'flex'
                            }}>
                              <CornerUpRight size={32} color="#4285F4" />
                            </div>
                            <div style={{ textAlign: 'right' }}>
                              <div style={{ fontSize: '14px', fontWeight: '800', color: '#FFF' }}>{currentNav.instruction}</div>
                              <div style={{ fontSize: '20px', fontWeight: '900', color: '#00E676', fontFamily: 'var(--font-racing)' }}>
                                {currentNav.dist}
                              </div>
                              <div style={{ fontSize: '11px', color: '#888' }}>{currentNav.road}</div>
                            </div>
                          </div>

                          {/* Giant Speedometer & Gear Indicator */}
                          <div style={{ textAlign: 'center', margin: '20px 0' }}>
                            <div style={{
                              fontSize: '5rem',
                              fontWeight: '900',
                              color: '#FFF',
                              fontFamily: 'var(--font-racing)',
                              lineHeight: 1,
                              textShadow: '0 0 20px rgba(255,102,0,0.5)'
                            }}>
                              {currentNav.speed}
                            </div>
                            <div style={{ fontSize: '13px', color: '#FF6600', letterSpacing: '2px', fontFamily: 'var(--font-racing)' }}>
                              KM / H
                            </div>
                            <div style={{
                              display: 'inline-block',
                              background: '#00E676',
                              color: '#000',
                              fontWeight: '900',
                              fontSize: '14px',
                              padding: '2px 10px',
                              borderRadius: '4px',
                              marginTop: '8px'
                            }}>
                              {currentNav.gear}
                            </div>
                          </div>

                          {/* KTM Brand footer */}
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #222', paddingTop: '10px' }}>
                            <span style={{ fontSize: '11px', color: '#666', fontFamily: 'var(--font-racing)' }}>KTM MY RIDE</span>
                            <span style={{ fontSize: '14px', fontWeight: '900', fontStyle: 'italic', color: '#FF6600', letterSpacing: '2px' }}>
                              KTM
                            </span>
                          </div>
                        </div>

                        <div style={{ textAlign: 'center', marginTop: '16px' }}>
                          <button
                            onClick={handleNextManeuver}
                            style={{
                              background: '#FF6600',
                              color: '#FFF',
                              border: 'none',
                              padding: '8px 16px',
                              borderRadius: '8px',
                              fontSize: '11px',
                              fontWeight: '700',
                              cursor: 'pointer'
                            }}
                          >
                            Simulate Next TFT Turn Event &rarr;
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 3: BIKE GARAGE */}
                {activeTab === 'garage' && (
                  <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <ArrowLeft size={16} color="#FFF" style={{ cursor: 'pointer' }} onClick={() => setActiveTab('dashboard')} />
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: '#FFF', margin: 0 }}>
                          My Garage
                        </h2>
                      </div>
                      <span
                        onClick={() => setShowAddBikeModal(true)}
                        style={{ fontSize: '12px', color: '#FF6600', fontWeight: '800', cursor: 'pointer' }}
                      >
                        + Add Bike
                      </span>
                    </div>

                    {/* Bikes List */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
                      {bikes.map(bike => {
                        const isCurrentActive = bike.id === activeBike.id;
                        return (
                          <div
                            key={bike.id}
                            onClick={() => setActiveBike(bike)}
                            style={{
                              background: '#14161C',
                              border: isCurrentActive ? '2px solid #FF6600' : '1px solid rgba(255,255,255,0.06)',
                              borderRadius: '16px',
                              padding: '14px',
                              cursor: 'pointer',
                              position: 'relative'
                            }}
                          >
                            <img src={bike.image || ktmDukeHero} alt={bike.model} style={{ width: '100%', height: '110px', objectFit: 'contain' }} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                              <div>
                                <div style={{ fontSize: '15px', fontWeight: '900', color: '#FFF' }}>{bike.model}</div>
                                <div style={{ fontSize: '11px', color: '#888' }}>{bike.year} • {bike.nickname}</div>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: isCurrentActive ? '#00E676' : '#888' }}>
                                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: isCurrentActive ? '#00E676' : '#666' }} />
                                <span>{isCurrentActive ? 'Connected (Active)' : 'Tap to Switch'}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* TAB 4: CONNECTION STATUS & DIAGNOSTICS */}
                {activeTab === 'connectionStatus' && (
                  <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
                      <ArrowLeft size={16} color="#FFF" style={{ cursor: 'pointer' }} onClick={() => setActiveTab('dashboard')} />
                      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: '#FFF', margin: 0 }}>
                        Connection Status
                      </h2>
                    </div>

                    <div style={{ margin: '16px 0' }}>
                      <div style={{
                        width: '96px',
                        height: '96px',
                        borderRadius: '50%',
                        border: isBtConnected ? '3px solid #00E676' : '3px solid #FF3B30',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: isBtConnected ? 'rgba(0,230,118,0.1)' : 'rgba(255,59,48,0.1)',
                        boxShadow: isBtConnected ? '0 0 25px rgba(0,230,118,0.3)' : '0 0 25px rgba(255,59,48,0.3)'
                      }}>
                        <Bluetooth size={44} color={isBtConnected ? '#00E676' : '#FF3B30'} />
                      </div>
                      <div style={{ fontSize: '17px', fontWeight: '900', color: isBtConnected ? '#00E676' : '#FF3B30', marginTop: '10px' }}>
                        {isBtConnected ? 'Connected' : 'Disconnected'}
                      </div>
                      <div style={{ fontSize: '12px', color: '#888' }}>
                        KTM_{activeBike.model.replace(' ', '_').toUpperCase()}
                      </div>
                    </div>

                    <div style={{ background: '#14161C', borderRadius: '14px', padding: '16px', marginBottom: '20px', textAlign: 'left' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #222' }}>
                        <span style={{ fontSize: '12px', color: '#888' }}>Bike</span>
                        <span style={{ fontSize: '12px', fontWeight: '800', color: '#FFF' }}>{activeBike.model} ({activeBike.year})</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #222' }}>
                        <span style={{ fontSize: '12px', color: '#888' }}>TFT Display</span>
                        <span style={{ fontSize: '12px', fontWeight: '800', color: '#00E676' }}>Supported</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #222' }}>
                        <span style={{ fontSize: '12px', color: '#888' }}>Navigation</span>
                        <span style={{ fontSize: '12px', fontWeight: '800', color: '#00E676' }}>Active</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
                        <span style={{ fontSize: '12px', color: '#888' }}>Signal Strength</span>
                        <span style={{ fontSize: '12px', fontWeight: '800', color: '#00E676' }}>•••• Strong (-58 dBm)</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsBtConnected(!isBtConnected)}
                      style={{
                        width: '100%',
                        padding: '14px',
                        background: isBtConnected ? '#FF3B30' : '#FF6600',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#FFF',
                        fontWeight: '800',
                        fontSize: '13px',
                        cursor: 'pointer'
                      }}
                    >
                      {isBtConnected ? 'Disconnect' : 'Connect Machine'}
                    </button>
                  </div>
                )}

                {/* TAB 5: SETTINGS */}
                {activeTab === 'settings' && (
                  <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
                      <ArrowLeft size={16} color="#FFF" style={{ cursor: 'pointer' }} onClick={() => setActiveTab('dashboard')} />
                      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: '#FFF', margin: 0 }}>
                        Settings
                      </h2>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {[
                        { title: 'Account', sub: 'Google Account (sriram@ktmvibe.com)' },
                        { title: 'Bike Settings', sub: `${activeBike.model} (${activeBike.year})` },
                        { title: 'Bluetooth', sub: isBtConnected ? 'Connected' : 'Disconnected', green: isBtConnected },
                        { title: 'Navigation', sub: 'Google Maps Engine' },
                        { title: 'App Preferences', sub: 'Theme: Dark • Speed: km/h' },
                        { title: 'Help & Support', sub: 'FAQs, Contact Us', action: () => setActiveTab('help') }
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          onClick={item.action}
                          style={{
                            background: '#14161C',
                            borderRadius: '12px',
                            padding: '14px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            cursor: item.action ? 'pointer' : 'default'
                          }}
                        >
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: '800', color: '#FFF' }}>{item.title}</div>
                            <div style={{ fontSize: '11px', color: item.green ? '#00E676' : '#888' }}>{item.sub}</div>
                          </div>
                          <ChevronRight size={16} color="#666" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 6: HELP & SUPPORT */}
                {activeTab === 'help' && (
                  <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
                      <ArrowLeft size={16} color="#FFF" style={{ cursor: 'pointer' }} onClick={() => setActiveTab('dashboard')} />
                      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: '#FFF', margin: 0 }}>
                        Help & Support
                      </h2>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {[
                        { title: 'How to Pair Your Bike', desc: 'Step-by-step Bluetooth pairing guide' },
                        { title: 'TFT Compatibility', desc: 'Supported models & features' },
                        { title: 'Troubleshooting', desc: 'Connection issues, no navigation' },
                        { title: 'Contact Support', desc: 'Get help from our team' }
                      ].map((item, idx) => (
                        <div key={idx} style={{ background: '#14161C', borderRadius: '12px', padding: '14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            background: 'rgba(255,102,0,0.15)',
                            border: '1px solid #FF6600',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}>
                            <HelpCircle size={18} color="#FF6600" />
                          </div>
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: '800', color: '#FFF' }}>{item.title}</div>
                            <div style={{ fontSize: '11px', color: '#888' }}>{item.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: 'auto', paddingTop: '20px' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: '4px' }}>
                        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: '900', fontStyle: 'italic', color: '#FF6600' }}>
                          KTM
                        </span>
                        <span style={{ fontFamily: 'cursive', fontSize: '1.3rem', fontWeight: '700', fontStyle: 'italic', color: '#FF8800' }}>
                          Vibe
                        </span>
                      </div>
                      <div style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>
                        Ride Smart. Ride Better.
                      </div>
                    </div>
                  </div>
                )}

                {/* Bottom App Bar (Always accessible in Main App) */}
                <div style={{
                  height: '54px',
                  background: '#090A0D',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  padding: '0 8px'
                }}>
                  <button
                    onClick={() => setActiveTab('dashboard')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: activeTab === 'dashboard' ? '#FF6600' : '#888',
                      fontSize: '11px',
                      fontWeight: activeTab === 'dashboard' ? '900' : '600',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '2px'
                    }}
                  >
                    <Smartphone size={16} />
                    <span>My Bikes</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('navigation')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: activeTab === 'navigation' ? '#FF6600' : '#888',
                      fontSize: '11px',
                      fontWeight: activeTab === 'navigation' ? '900' : '600',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '2px'
                    }}
                  >
                    <Navigation size={16} />
                    <span>Navigation</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('garage')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: activeTab === 'garage' ? '#FF6600' : '#888',
                      fontSize: '11px',
                      fontWeight: activeTab === 'garage' ? '900' : '600',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '2px'
                    }}
                  >
                    <Layers size={16} />
                    <span>Garage</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('settings')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: activeTab === 'settings' ? '#FF6600' : '#888',
                      fontSize: '11px',
                      fontWeight: activeTab === 'settings' ? '900' : '600',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '2px'
                    }}
                  >
                    <Sliders size={16} />
                    <span>Settings</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('help')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: activeTab === 'help' ? '#FF6600' : '#888',
                      fontSize: '11px',
                      fontWeight: activeTab === 'help' ? '900' : '600',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '2px'
                    }}
                  >
                    <HelpCircle size={16} />
                    <span>Help</span>
                  </button>
                </div>

              </div>
            )}

          </div>

          {/* iOS / Android bottom bar pill */}
          {viewMode === 'phone' && (
            <div style={{
              width: '120px',
              height: '4px',
              background: '#444',
              borderRadius: '2px',
              margin: '6px auto',
              opacity: 0.6
            }} />
          )}
        </div>
      </div>

      {/* Add Bike Modal Dialog */}
      {showAddBikeModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          padding: '16px'
        }}>
          <form
            onSubmit={handleAddBike}
            style={{
              background: '#14161C',
              border: '1px solid rgba(255,102,0,0.3)',
              borderRadius: '20px',
              padding: '24px',
              width: '100%',
              maxWidth: '380px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: '#FFF', margin: 0 }}>
                Add Bike to Garage
              </h3>
              <X size={20} color="#888" style={{ cursor: 'pointer' }} onClick={() => setShowAddBikeModal(false)} />
            </div>

            <div>
              <label style={{ fontSize: '11px', color: '#888', display: 'block', marginBottom: '4px' }}>Model</label>
              <input
                type="text"
                value={newBikeModel}
                onChange={e => setNewBikeModel(e.target.value)}
                style={{ width: '100%', background: '#090A0D', border: '1px solid #333', color: '#FFF', padding: '10px', borderRadius: '8px', fontSize: '13px' }}
                placeholder="e.g. Duke 390 / RC 390"
              />
            </div>

            <div>
              <label style={{ fontSize: '11px', color: '#888', display: 'block', marginBottom: '4px' }}>Year</label>
              <input
                type="text"
                value={newBikeYear}
                onChange={e => setNewBikeYear(e.target.value)}
                style={{ width: '100%', background: '#090A0D', border: '1px solid #333', color: '#FFF', padding: '10px', borderRadius: '8px', fontSize: '13px' }}
                placeholder="e.g. 2025"
              />
            </div>

            <div>
              <label style={{ fontSize: '11px', color: '#888', display: 'block', marginBottom: '4px' }}>Nickname</label>
              <input
                type="text"
                value={newBikeNickname}
                onChange={e => setNewBikeNickname(e.target.value)}
                style={{ width: '100%', background: '#090A0D', border: '1px solid #333', color: '#FFF', padding: '10px', borderRadius: '8px', fontSize: '13px' }}
                placeholder="e.g. Track Monster"
              />
            </div>

            <button
              type="submit"
              className="ktm-angle-button"
              style={{
                width: '100%',
                background: '#FF6600',
                color: '#FFF',
                border: 'none',
                padding: '12px',
                borderRadius: '8px',
                fontWeight: '900',
                fontSize: '13px',
                cursor: 'pointer',
                marginTop: '8px'
              }}
            >
              Add Machine to Garage
            </button>
          </form>
        </div>
      )}

      {/* Open on Phone QR Code Modal */}
      {showQrModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 3000,
          padding: '16px'
        }}>
          <div style={{
            background: '#14161C',
            border: '2px solid #FF6600',
            borderRadius: '24px',
            padding: '28px',
            width: '100%',
            maxWidth: '420px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            boxShadow: '0 20px 60px rgba(0,0,0,0.9), 0 0 30px rgba(255,102,0,0.3)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Smartphone size={20} color="#FF6600" />
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: '#FFF', margin: 0 }}>
                  Open Live on Your Phone
                </h3>
              </div>
              <X size={20} color="#888" style={{ cursor: 'pointer' }} onClick={() => setShowQrModal(false)} />
            </div>

            <p style={{ fontSize: '12px', color: '#AAA', marginBottom: '16px', lineHeight: '1.5' }}>
              Scan this QR code with your phone camera, or open this URL directly in Chrome / Safari on your phone:
            </p>

            {/* QR Code Container */}
            <div style={{
              background: '#FFFFFF',
              padding: '14px',
              borderRadius: '16px',
              marginBottom: '16px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.5)'
            }}>
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=http://10.206.121.190:5173"
                alt="Scan to Open on Phone"
                style={{ width: '180px', height: '180px', display: 'block' }}
              />
            </div>

            {/* Direct URL Box */}
            <div style={{
              background: '#090A0D',
              border: '1px solid #333',
              borderRadius: '10px',
              padding: '10px 16px',
              fontSize: '14px',
              fontWeight: '800',
              color: '#00E676',
              fontFamily: 'var(--font-racing)',
              letterSpacing: '0.8px',
              marginBottom: '14px',
              width: '100%',
              userSelect: 'all'
            }}>
              http://10.206.121.190:5173
            </div>

            <div style={{ textAlign: 'left', fontSize: '11px', color: '#8E95A5', lineHeight: '1.6', background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px', width: '100%' }}>
              <div><strong>1.</strong> உங்கள் போனும் லேப்டாப்பும் ஒரே Wi-Fi / Hotspot-ல் இருக்க வேண்டும்.</div>
              <div><strong>2.</strong> போன் கேமராவால் QR code-ஐ scan செய்யலாம் அல்லது மேலே உள்ள URL-ஐ பிரவுசரில் தட்டச்சு செய்யலாம்.</div>
              <div><strong>3.</strong> முழு ஆப்பும் உங்கள் போனில் திறக்கும்! Chrome-ல் <strong>"Add to Home screen"</strong> கொடுத்தால் ரியல் ஆப் போல ஐகான் வந்துவிடும்!</div>
            </div>

            <button
              onClick={() => setShowQrModal(false)}
              className="ktm-angle-button"
              style={{
                marginTop: '16px',
                width: '100%',
                padding: '12px',
                background: '#FF6600',
                border: 'none',
                color: '#FFF',
                fontWeight: '900',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
