import React, { useState, useEffect } from 'react';
import ktmDukeHero from '../assets/ktm_duke_hero.jpg';
import ktmRidingHighway from '../assets/ktm_riding_highway.jpg';
import {
  Bluetooth, Navigation, MapPin, Search, Mic, Menu, Bell, Check,
  ChevronRight, ArrowLeft, RefreshCw, Smartphone, Layers, CheckCircle2,
  Compass, Shield, AlertTriangle, CornerUpRight, Wrench, Fuel, CloudRain,
  Sliders, HelpCircle, Database, Plus, Trash2
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
  const [selectedBrand, setSelectedBrand] = useState('KTM');
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedModel, setSelectedModel] = useState('Duke 160');

  return (
    <div className="phone-wrapper" style={{
      width: '380px',
      height: '760px',
      background: '#090A0D',
      borderRadius: '44px',
      border: '10px solid #1C1F26',
      boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 35px rgba(255,102,0,0.25)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
      userSelect: 'none'
    }}>
      {/* Top Speaker & Camera Notch */}
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

      {/* Screen View Container */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }}>

        {/* ========================================================= */}
        {/* SCREEN 1: SPLASH / LOADING (3D Bike Animation + Logo) */}
        {/* ========================================================= */}
        {currentScreenId === 1 && (
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '20px',
            background: 'radial-gradient(circle at center, rgba(255,102,0,0.15) 0%, #090A0D 70%)'
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '2px' }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '2.4rem', fontWeight: '900', fontStyle: 'italic', color: '#FF6600' }}>
                KTM
              </span>
              <span style={{ fontFamily: 'cursive', fontSize: '2.2rem', fontWeight: '700', fontStyle: 'italic', color: '#FF8800' }}>
                Vibe
              </span>
            </div>
            <div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#8E95A5', marginBottom: '20px' }}>
              Connect • Ride • Explore
            </div>

            {/* 3D KTM Duke Hero Image */}
            <div style={{ position: 'relative', width: '100%', height: '230px', margin: '10px 0' }}>
              <img
                src={ktmDukeHero}
                alt="KTM Duke"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 0 20px rgba(255,102,0,0.5))'
                }}
              />
            </div>

            {/* Glowing progress bar */}
            <div style={{ width: '80%', height: '4px', background: '#1A1D24', borderRadius: '2px', overflow: 'hidden', margin: '20px auto 8px' }}>
              <div style={{ width: '70%', height: '100%', background: '#FF6600', boxShadow: '0 0 8px #FF6600' }} />
            </div>
            <div style={{ fontSize: '11px', color: '#888' }}>
              Loading your ride experience...
            </div>

            <button
              onClick={() => setCurrentScreenId(2)}
              className="ktm-angle-button"
              style={{
                marginTop: '30px',
                width: '80%',
                padding: '12px',
                background: '#FF6600',
                border: 'none',
                color: '#FFF',
                fontWeight: '800',
                cursor: 'pointer'
              }}
            >
              LAUNCH TO LOGIN &rarr;
            </button>
          </div>
        )}

        {/* ========================================================= */}
        {/* SCREEN 2: GOOGLE LOGIN (Firebase Auth) */}
        {/* ========================================================= */}
        {currentScreenId === 2 && (
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

            <div style={{ fontSize: '13px', color: '#EEE', marginBottom: '24px', fontWeight: '600' }}>
              Sign in with Google<br />to continue
            </div>

            {/* Google Sign-in Pill Button */}
            <button
              onClick={() => setCurrentScreenId(3)}
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
                marginTop: '12px',
                background: 'transparent',
                color: '#8E95A5',
                border: 'none',
                fontSize: '11px',
                cursor: 'pointer'
              }}
            >
              Continue as Guest (Local Setup)
            </button>

            <div style={{ marginTop: 'auto', fontSize: '9px', color: '#666', lineHeight: '1.4' }}>
              By continuing, you agree to our<br />Terms & Privacy Policy
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SCREEN 12: ONBOARDING INTRO (Smart Navigation for your KTM) */}
        {/* ========================================================= */}
        {currentScreenId === 3 && (
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
            {/* Gradient Overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(9,10,13,0.7) 0%, rgba(9,10,13,0.2) 40%, rgba(9,10,13,0.95) 100%)',
              zIndex: 1
            }} />

            {/* Top Logo */}
            <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
              <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: '4px' }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: '900', fontStyle: 'italic', color: '#FF6600' }}>
                  KTM
                </span>
                <span style={{ fontFamily: 'cursive', fontSize: '1.6rem', fontWeight: '700', fontStyle: 'italic', color: '#FF8800' }}>
                  Vibe
                </span>
              </div>
            </div>

            {/* Bottom Content Card */}
            <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: '900', color: '#FFF', margin: '0 0 8px' }}>
                Smart Navigation<br />for Your KTM
              </h2>
              <p style={{ fontSize: '12px', color: '#DDD', margin: '0 0 20px', lineHeight: '1.5' }}>
                Connect your bike, get turn-by-turn navigation on your TFT and ride smarter.
              </p>

              <button
                onClick={() => setCurrentScreenId(4)}
                className="ktm-angle-button"
                style={{
                  width: '100%',
                  padding: '14px',
                  background: '#FF6600',
                  border: 'none',
                  color: '#FFF',
                  fontWeight: '800',
                  fontSize: '13px',
                  fontFamily: 'var(--font-heading)',
                  cursor: 'pointer'
                }}
              >
                Get Started
              </button>

              <button
                onClick={() => setCurrentScreenId(6)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#8E95A5',
                  fontSize: '11px',
                  cursor: 'pointer',
                  marginTop: '10px'
                }}
              >
                Skip
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SCREEN 3: SELECT YOUR BIKE (Brand -> Model -> Year) */}
        {/* ========================================================= */}
        {currentScreenId === 4 && (
          <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: '#FFF', margin: '0 0 2px' }}>
              Select Your Bike
            </h2>
            <div style={{ fontSize: '11px', color: '#8E95A5', marginBottom: '14px' }}>
              Choose your KTM bike details
            </div>

            {/* Brand tabs: KTM, Husqvarna, GASGAS */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              {['KTM', 'Husqvarna', 'GASGAS'].map(brand => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  style={{
                    flex: 1,
                    padding: '8px',
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

            {/* Model 2x2 Grid: Duke 160, Duke 200, Duke 250, Duke 390 */}
            <div style={{ fontSize: '11px', fontWeight: '700', color: '#888', marginBottom: '8px' }}>
              Model
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
              {['Duke 160', 'Duke 200', 'Duke 250', 'Duke 390'].map(model => {
                const isSelected = selectedModel === model;
                return (
                  <div
                    key={model}
                    onClick={() => {
                      setSelectedModel(model);
                      setActiveBike(prev => ({ ...prev, model: `KTM ${model}` }));
                    }}
                    style={{
                      background: isSelected ? 'rgba(255,102,0,0.15)' : '#14161C',
                      border: isSelected ? '2px solid #FF6600' : '1px solid rgba(255,255,255,0.06)',
                      borderRadius: '12px',
                      padding: '12px',
                      textAlign: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <img src={ktmDukeHero} alt={model} style={{ width: '80px', height: '50px', objectFit: 'contain', margin: '0 auto' }} />
                    <div style={{ fontSize: '12px', fontWeight: '800', color: '#FFF', marginTop: '4px' }}>
                      {model}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Year selector */}
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
                    padding: '8px',
                    borderRadius: '8px',
                    border: selectedYear === year ? '1px solid #FF6600' : '1px solid #222',
                    background: selectedYear === year ? '#FF6600' : '#14161C',
                    color: selectedYear === year ? '#FFF' : '#AAA',
                    fontWeight: '700',
                    fontSize: '11px',
                    cursor: 'pointer'
                  }}
                >
                  {year}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentScreenId(5)}
              className="ktm-angle-button"
              style={{
                marginTop: 'auto',
                padding: '12px',
                background: '#FF6600',
                border: 'none',
                color: '#FFF',
                fontWeight: '800',
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              Next
            </button>
          </div>
        )}

        {/* ========================================================= */}
        {/* SCREEN 4: BLUETOOTH SETUP (Pair during setup) */}
        {/* ========================================================= */}
        {currentScreenId === 5 && (
          <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: '#FFF', margin: '0 0 2px' }}>
              Bluetooth Setup
            </h2>
            <div style={{ fontSize: '11px', color: '#8E95A5', marginBottom: '14px' }}>
              Pair your bike with the app
            </div>

            {/* Glowing bike + Bluetooth graphic */}
            <div style={{
              background: '#12141A',
              border: '1px solid rgba(255,102,0,0.3)',
              borderRadius: '16px',
              padding: '16px',
              textAlign: 'center',
              marginBottom: '16px',
              position: 'relative'
            }}>
              <img src={ktmDukeHero} alt="Bike" style={{ width: '130px', height: '80px', objectFit: 'contain' }} />
              <div style={{
                position: 'absolute',
                top: '50%',
                right: '20px',
                transform: 'translateY(-50%)',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'rgba(255,102,0,0.2)',
                border: '2px solid #FF6600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 15px rgba(255,102,0,0.5)'
              }}>
                <Bluetooth size={24} color="#FF6600" />
              </div>
            </div>

            {/* 4-step checklist */}
            <div style={{ background: '#12141A', borderRadius: '12px', padding: '14px', marginBottom: '14px' }}>
              <div style={{ fontSize: '11px', color: '#CCC', lineHeight: '1.8' }}>
                <div>1. Enable Bluetooth</div>
                <div>2. Allow location & permissions</div>
                <div>3. Scan for KTM devices</div>
                <div>4. Pair and connect</div>
              </div>
            </div>

            {/* Detected Device Card */}
            <div style={{
              background: '#14161C',
              border: '1px solid #FF6600',
              borderRadius: '12px',
              padding: '12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '14px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(255,102,0,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Bluetooth size={16} color="#FF6600" />
                </div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: '800', color: '#FFF' }}>KTM_DUKE_160</div>
                  <div style={{ fontSize: '10px', color: '#00E676' }}>Available</div>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsBtConnected(true);
                  setCurrentScreenId(6);
                }}
                style={{
                  background: '#FF6600',
                  color: '#FFF',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  fontSize: '11px',
                  fontWeight: '800',
                  cursor: 'pointer'
                }}
              >
                Connect
              </button>
            </div>

            <div style={{ textAlign: 'center', fontSize: '11px', color: '#FF8533', marginTop: 'auto' }}>
              Need help? View pairing guide
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SCREEN 5: HOME DASHBOARD (Bike Visual + Connection Card) */}
        {/* ========================================================= */}
        {currentScreenId === 6 && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '14px' }}>
            {/* Top Bar: Menu, Logo, Bell */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <Menu size={20} color="#DDD" style={{ cursor: 'pointer' }} />
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: '900', fontStyle: 'italic', color: '#FF6600' }}>
                  KTM
                </span>
                <span style={{ fontFamily: 'cursive', fontSize: '1.2rem', fontWeight: '700', fontStyle: 'italic', color: '#FF8800' }}>
                  Vibe
                </span>
              </div>
              <div style={{ position: 'relative' }}>
                <Bell size={20} color="#DDD" style={{ cursor: 'pointer' }} onClick={() => setCurrentScreenId(20)} />
                <span style={{ position: 'absolute', top: 0, right: 0, width: '7px', height: '7px', borderRadius: '50%', background: '#FF6600' }} />
              </div>
            </div>

            {/* Hero Bike on Pedestal */}
            <div style={{ position: 'relative', height: '170px', margin: '4px 0 10px', textAlign: 'center' }}>
              <img
                src={ktmDukeHero}
                alt="Duke 160"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 10px 15px rgba(255,102,0,0.4))'
                }}
              />
            </div>

            {/* Bike Model & Status */}
            <div style={{ marginBottom: '12px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '900', color: '#FFF', margin: 0, fontFamily: 'var(--font-heading)' }}>
                {activeBike.model} ({selectedYear})
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#00E676', marginTop: '2px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00E676' }} />
                <span>Connected</span>
              </div>
            </div>

            {/* Connection Card: Bluetooth Connected + TFT Support: Available */}
            <div style={{
              background: '#12141A',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '14px',
              padding: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '16px'
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(0,230,118,0.15)',
                border: '1px solid #00E676',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Bluetooth size={18} color="#00E676" />
              </div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: '800', color: '#FFF' }}>Bluetooth Connected</div>
                <div style={{ fontSize: '11px', color: '#00E676', fontWeight: '600' }}>TFT Support: Available</div>
              </div>
            </div>

            {/* Large Orange Action Button */}
            <button
              onClick={() => setCurrentScreenId(8)}
              className="ktm-angle-button"
              style={{
                width: '100%',
                padding: '14px',
                background: '#FF6600',
                border: 'none',
                color: '#FFF',
                fontWeight: '900',
                fontSize: '13px',
                letterSpacing: '0.8px',
                cursor: 'pointer',
                fontFamily: 'var(--font-heading)',
                boxShadow: '0 4px 15px rgba(255,102,0,0.4)'
              }}
            >
              Start Navigation
            </button>

            {/* Bottom 3-tab Bar: My Bikes, Settings, Help */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              paddingTop: '10px',
              marginTop: 'auto'
            }}>
              <button
                onClick={() => setCurrentScreenId(7)}
                style={{ background: 'none', border: 'none', color: '#FF6600', fontSize: '11px', fontWeight: '800', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}
              >
                <span>My Bikes</span>
              </button>
              <button
                onClick={() => setCurrentScreenId(17)}
                style={{ background: 'none', border: 'none', color: '#888', fontSize: '11px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}
              >
                <span>Settings</span>
              </button>
              <button
                onClick={() => setCurrentScreenId(18)}
                style={{ background: 'none', border: 'none', color: '#888', fontSize: '11px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}
              >
                <span>Help</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SCREEN 6: NAVIGATION (Google Maps) */}
        {/* ========================================================= */}
        {currentScreenId === 8 && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
            {/* Top Search bar */}
            <div style={{
              padding: '8px 12px',
              background: '#12141A',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              borderBottom: '1px solid rgba(255,255,255,0.06)'
            }}>
              <Search size={16} color="#888" />
              <span style={{ fontSize: '12px', color: '#777', flex: 1 }}>Search here</span>
              <Mic size={16} color="#888" />
            </div>

            {/* Simulated Dark Google Map Canvas */}
            <div style={{
              flex: 1,
              background: '#151922',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Roads grid pattern */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
              }} />

              {/* Highway Route Polyline */}
              <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
                <path
                  d="M 120 320 L 160 210 L 250 140 L 250 40"
                  fill="none"
                  stroke="#4285F4"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <circle cx="120" cy="320" r="8" fill="#FF6600" stroke="#FFF" strokeWidth="2" />
                <circle cx="250" cy="40" r="7" fill="#FF3B30" stroke="#FFF" strokeWidth="2" />
              </svg>

              {/* Watermark Google */}
              <div style={{ position: 'absolute', bottom: '8px', left: '12px', fontSize: '10px', color: '#666', fontWeight: '700' }}>
                Google
              </div>
            </div>

            {/* Bottom Turn-by-Turn Card */}
            <div style={{
              background: '#101217',
              borderTop: '2px solid #FF6600',
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: '#4285F4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 10px rgba(66,133,244,0.5)'
                }}>
                  <CornerUpRight size={22} color="#FFF" />
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '800', color: '#FFF' }}>Turn right</div>
                  <div style={{ fontSize: '12px', color: '#00E676', fontWeight: '700' }}>2.0 km • OMR Service Rd</div>
                </div>
              </div>

              <div style={{ fontSize: '10px', color: '#888', marginTop: '4px' }}>
                12 min • 5.8 km • 10:22 AM
              </div>

              <button
                onClick={() => setCurrentScreenId(6)}
                style={{
                  marginTop: '8px',
                  background: '#1A1D24',
                  border: '1px solid #333',
                  color: '#AAA',
                  padding: '6px',
                  borderRadius: '6px',
                  fontSize: '10px',
                  cursor: 'pointer'
                }}
              >
                Exit Navigation
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SCREEN 9: BIKE GARAGE (My Garage + Add Bike) */}
        {/* ========================================================= */}
        {currentScreenId === 7 && (
          <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ArrowLeft size={16} color="#FFF" style={{ cursor: 'pointer' }} onClick={() => setCurrentScreenId(6)} />
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: '#FFF', margin: 0 }}>
                  My Garage
                </h2>
              </div>
              <span style={{ fontSize: '11px', color: '#FF6600', fontWeight: '800', cursor: 'pointer' }}>
                + Add Bike
              </span>
            </div>

            {/* Bike Card 1: Duke 160 (Connected) */}
            <div
              onClick={() => setActiveBike(allBikes[0])}
              style={{
                background: '#14161C',
                border: '2px solid #FF6600',
                borderRadius: '14px',
                padding: '14px',
                marginBottom: '12px',
                cursor: 'pointer'
              }}
            >
              <img src={ktmDukeHero} alt="Duke 160" style={{ width: '100%', height: '90px', objectFit: 'contain' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '900', color: '#FFF' }}>Duke 160</div>
                  <div style={{ fontSize: '11px', color: '#888' }}>2025</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#00E676' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00E676' }} />
                  <span>Connected</span>
                </div>
              </div>
            </div>

            {/* Bike Card 2: Duke 250 (Not Connected) */}
            <div
              style={{
                background: '#12141A',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '14px',
                padding: '14px',
                marginBottom: '12px',
                opacity: 0.7
              }}
            >
              <img src={ktmDukeHero} alt="Duke 250" style={{ width: '100%', height: '80px', objectFit: 'contain', filter: 'grayscale(0.5)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '800', color: '#AAA' }}>Duke 250</div>
                  <div style={{ fontSize: '11px', color: '#666' }}>2024</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#888' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#666' }} />
                  <span>Not Connected</span>
                </div>
              </div>
            </div>

            {/* Bottom 4-tab bar: Home, Garage, Settings, Help */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              paddingTop: '10px',
              marginTop: 'auto'
            }}>
              <span onClick={() => setCurrentScreenId(6)} style={{ color: '#888', fontSize: '11px', cursor: 'pointer' }}>Home</span>
              <span style={{ color: '#FF6600', fontSize: '11px', fontWeight: '800' }}>Garage</span>
              <span onClick={() => setCurrentScreenId(17)} style={{ color: '#888', fontSize: '11px', cursor: 'pointer' }}>Settings</span>
              <span onClick={() => setCurrentScreenId(18)} style={{ color: '#888', fontSize: '11px', cursor: 'pointer' }}>Help</span>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SCREEN 10: CONNECTION STATUS (Live Status + Troubleshooting) */}
        {/* ========================================================= */}
        {currentScreenId === 9 && (
          <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
              <ArrowLeft size={16} color="#FFF" style={{ cursor: 'pointer' }} onClick={() => setCurrentScreenId(6)} />
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: '#FFF', margin: 0 }}>
                Connection Status
              </h2>
            </div>

            {/* Circular Status Ring */}
            <div style={{ margin: '14px 0' }}>
              <div style={{
                width: '90px',
                height: '90px',
                borderRadius: '50%',
                border: '3px solid #00E676',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0,230,118,0.1)',
                boxShadow: '0 0 25px rgba(0,230,118,0.3)'
              }}>
                <Bluetooth size={42} color="#00E676" />
              </div>
              <div style={{ fontSize: '16px', fontWeight: '900', color: '#00E676', marginTop: '10px' }}>
                Connected
              </div>
              <div style={{ fontSize: '12px', color: '#888' }}>
                KTM_DUKE_160
              </div>
            </div>

            {/* Diagnostics List Card */}
            <div style={{ background: '#14161C', borderRadius: '12px', padding: '14px', marginBottom: '20px', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #222' }}>
                <span style={{ fontSize: '12px', color: '#888' }}>Bike</span>
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#FFF' }}>Duke 160 (2025)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #222' }}>
                <span style={{ fontSize: '12px', color: '#888' }}>TFT Display</span>
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#00E676' }}>Supported</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #222' }}>
                <span style={{ fontSize: '12px', color: '#888' }}>Navigation</span>
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#00E676' }}>Active</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                <span style={{ fontSize: '12px', color: '#888' }}>Signal Strength</span>
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#00E676' }}>•••• Strong</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsBtConnected(false);
                setCurrentScreenId(5);
              }}
              style={{
                width: '100%',
                padding: '12px',
                background: '#FF3B30',
                border: 'none',
                borderRadius: '8px',
                color: '#FFF',
                fontWeight: '800',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              Disconnect
            </button>
          </div>
        )}

        {/* ========================================================= */}
        {/* SCREEN 8: SETTINGS (Profile, Bike, App Preferences) */}
        {/* ========================================================= */}
        {currentScreenId === 17 && (
          <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
              <ArrowLeft size={16} color="#FFF" style={{ cursor: 'pointer' }} onClick={() => setCurrentScreenId(6)} />
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: '#FFF', margin: 0 }}>
                Settings
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { title: 'Account', sub: 'Google Account' },
                { title: 'Bike Settings', sub: 'Duke 160 (2025)' },
                { title: 'Bluetooth', sub: 'Connected', green: true },
                { title: 'Navigation', sub: 'Google Maps' },
                { title: 'App Preferences', sub: 'Theme, Language, Notifications' },
                { title: 'Help & Support', sub: 'FAQs, Contact Us', action: () => setCurrentScreenId(18) }
              ].map((item, idx) => (
                <div
                  key={idx}
                  onClick={item.action}
                  style={{
                    background: '#14161C',
                    borderRadius: '10px',
                    padding: '12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: item.action ? 'pointer' : 'default'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: '800', color: '#FFF' }}>{item.title}</div>
                    <div style={{ fontSize: '10px', color: item.green ? '#00E676' : '#888' }}>{item.sub}</div>
                  </div>
                  <ChevronRight size={14} color="#666" />
                </div>
              ))}
            </div>

            {/* Bottom 4-tab bar */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              paddingTop: '10px',
              marginTop: 'auto'
            }}>
              <span onClick={() => setCurrentScreenId(6)} style={{ color: '#888', fontSize: '11px', cursor: 'pointer' }}>Home</span>
              <span onClick={() => setCurrentScreenId(7)} style={{ color: '#888', fontSize: '11px', cursor: 'pointer' }}>Garage</span>
              <span style={{ color: '#FF6600', fontSize: '11px', fontWeight: '800' }}>Settings</span>
              <span onClick={() => setCurrentScreenId(18)} style={{ color: '#888', fontSize: '11px', cursor: 'pointer' }}>Help</span>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SCREEN 11: HELP & SUPPORT (Guides & Troubleshooting) */}
        {/* ========================================================= */}
        {currentScreenId === 18 && (
          <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
              <ArrowLeft size={16} color="#FFF" style={{ cursor: 'pointer' }} onClick={() => setCurrentScreenId(6)} />
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: '#FFF', margin: 0 }}>
                Help & Support
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { title: 'How to Pair Your Bike', desc: 'Step-by-step guide' },
                { title: 'TFT Compatibility', desc: 'Supported models & features' },
                { title: 'Troubleshooting', desc: 'Connection issues, no navigation' },
                { title: 'Contact Support', desc: 'Get help from our team' }
              ].map((item, idx) => (
                <div key={idx} style={{ background: '#14161C', borderRadius: '12px', padding: '14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'rgba(255,102,0,0.15)',
                    border: '1px solid #FF6600',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <HelpCircle size={16} color="#FF6600" />
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: '800', color: '#FFF' }}>{item.title}</div>
                    <div style={{ fontSize: '10px', color: '#888' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: 'auto', paddingTop: '16px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: '4px' }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: '900', fontStyle: 'italic', color: '#FF6600' }}>
                  KTM
                </span>
                <span style={{ fontFamily: 'cursive', fontSize: '1.1rem', fontWeight: '700', fontStyle: 'italic', color: '#FF8800' }}>
                  Vibe
                </span>
              </div>
              <div style={{ fontSize: '10px', color: '#666', marginTop: '2px' }}>
                Ride Smart. Ride Better.
              </div>
            </div>
          </div>
        )}

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
