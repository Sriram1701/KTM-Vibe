import React, { useState } from 'react';
import {
  KTM_SCREENS,
  INITIAL_BIKES,
  SERVICE_ITEMS,
  RECENT_RIDES,
  BIKE_COMPATIBILITY_DATABASE
} from './data/mockData';
import PhoneSimulator from './components/PhoneSimulator';
import PosterOverview from './components/PosterOverview';
import BikeMatrix from './components/BikeMatrix';
import RoadmapTracker from './components/RoadmapTracker';
import TftProtocolGuide from './components/TftProtocolGuide';
import {
  Smartphone,
  Layers,
  Bike,
  CheckSquare,
  Cpu,
  Bluetooth,
  Navigation,
  AlertTriangle,
  Play,
  RotateCcw,
  Zap,
  ExternalLink,
  Shield,
  Download,
  Info,
  Layout
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('poster'); // 'poster' (Like Image) | 'simulator' | 'bikes' | 'roadmap' | 'protocol'
  const [currentScreenId, setCurrentScreenId] = useState(6); // Default to Screen 06: Home Dashboard
  const [allBikes, setAllBikes] = useState(INITIAL_BIKES);
  const [activeBike, setActiveBike] = useState(INITIAL_BIKES[0]);
  const [isBtConnected, setIsBtConnected] = useState(true);
  const [serviceList, setServiceList] = useState(SERVICE_ITEMS);
  const [sosActive, setSosActive] = useState(false);
  const [sosCountdown, setSosCountdown] = useState(10);
  const [simNavigation, setSimNavigation] = useState({
    destination: 'OMR Service Rd',
    distanceMeters: 2000,
    turnText: 'Turn right'
  });

  const handleSelectScreenFromPoster = (screenId) => {
    setCurrentScreenId(screenId);
    setActiveTab('simulator');
  };

  const handleTriggerSos = () => {
    setCurrentScreenId(13);
    setSosActive(true);
    setSosCountdown(10);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--color-bg-dark)' }}>
      {/* Top Header Bar */}
      <header style={{
        background: 'rgba(10, 11, 14, 0.95)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 102, 0, 0.25)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        padding: '0 24px'
      }}>
        <div style={{
          maxWidth: '1500px',
          margin: '0 auto',
          height: '70px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* Logo & Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #FF6600 0%, #D44400 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 18px rgba(255, 102, 0, 0.4)'
            }}>
              <Zap size={24} color="#FFF" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: '900', fontStyle: 'italic', color: '#FF6600' }}>
                  KTM
                </span>
                <span style={{ fontFamily: 'cursive', fontSize: '1.3rem', fontWeight: '700', fontStyle: 'italic', color: '#FF8800' }}>
                  Vibe
                </span>
                <span className="ktm-badge ktm-badge-orange" style={{ fontSize: '9px', marginLeft: '6px' }}>LIKE IMAGE</span>
              </div>
              <div style={{ fontSize: '10px', color: '#8E95A5', letterSpacing: '1px', textTransform: 'uppercase' }}>
                Connect • Ride • Explore
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav style={{ display: 'flex', gap: '6px' }}>
            {[
              { id: 'poster', label: 'Design Poster View', icon: Layout },
              { id: 'simulator', label: 'Live Phone Simulator', icon: Smartphone },
              { id: 'bikes', label: 'Bike Compatibility', icon: Bike },
              { id: 'roadmap', label: 'Roadmap & DoD', icon: CheckSquare },
              { id: 'protocol', label: 'TFT Architecture', icon: Cpu }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    border: isActive ? '1px solid #FF6600' : '1px solid transparent',
                    background: isActive ? 'rgba(255, 102, 0, 0.15)' : 'transparent',
                    color: isActive ? '#FF8533' : '#99A1B3',
                    fontWeight: '700',
                    fontSize: '13px',
                    fontFamily: 'var(--font-heading)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Status Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              background: '#14161C',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '20px',
              padding: '6px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '12px'
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#00E676',
                boxShadow: '0 0 8px #00E676'
              }} />
              <span style={{ color: '#EEE', fontWeight: '600' }}>Duke 160 (2025)</span>
              <span style={{ color: '#00E676', fontSize: '11px', fontWeight: '700' }}>CONNECTED</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '24px' }}>
        {/* ========================================================= */}
        {/* TAB 1: POSTER OVERVIEW (Exact Replica of Uploaded Image) */}
        {/* ========================================================= */}
        {activeTab === 'poster' && (
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
              background: 'rgba(255,102,0,0.1)',
              border: '1px solid rgba(255,102,0,0.3)',
              borderRadius: '12px',
              padding: '12px 20px'
            }}>
              <div style={{ fontSize: '13px', color: '#DDD' }}>
                <strong style={{ color: '#FF8533' }}>KTM Vibe Master Visual Reference</strong> — Showing all 12 screens and TFT display exactly like your design reference image. Click any screen to test it live!
              </div>
              <button
                onClick={() => setActiveTab('simulator')}
                className="ktm-angle-button"
                style={{
                  background: '#FF6600',
                  color: '#FFF',
                  border: 'none',
                  padding: '8px 16px',
                  fontWeight: '800',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                OPEN LIVE INTERACTIVE PHONE &rarr;
              </button>
            </div>

            <PosterOverview onSelectScreen={handleSelectScreenFromPoster} />
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: INTERACTIVE LIVE PHONE SIMULATOR */}
        {/* ========================================================= */}
        {activeTab === 'simulator' && (
          <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', gap: '32px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {/* Left: The phone simulator */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', padding: '0 6px' }}>
                <span className="ktm-badge ktm-badge-orange">
                  LIVE INTERACTIVE PHONE TESTER
                </span>
                <button
                  onClick={() => setActiveTab('poster')}
                  style={{ background: 'none', border: 'none', color: '#FF8533', fontSize: '11px', cursor: 'pointer', fontWeight: '700' }}
                >
                  &larr; Back to Poster View
                </button>
              </div>

              <PhoneSimulator
                currentScreenId={currentScreenId}
                setCurrentScreenId={setCurrentScreenId}
                activeBike={activeBike}
                setActiveBike={setActiveBike}
                allBikes={allBikes}
                setAllBikes={setAllBikes}
                simNavigation={simNavigation}
                setSimNavigation={setSimNavigation}
                isBtConnected={isBtConnected}
                setIsBtConnected={setIsBtConnected}
                serviceList={serviceList}
                setServiceList={setServiceList}
                onTriggerSos={handleTriggerSos}
                sosActive={sosActive}
                setSosActive={setSosActive}
                sosCountdown={sosCountdown}
                setSosCountdown={setSosCountdown}
              />
            </div>

            {/* Right: Quick Screen Switcher & Controller */}
            <div style={{ flex: '1 1 500px', maxWidth: '720px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{
                background: '#12141A',
                border: '1px solid rgba(255, 102, 0, 0.3)',
                borderRadius: '16px',
                padding: '20px'
              }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: '#FFF', margin: '0 0 14px' }}>
                  POSTER SCREENS QUICK SWITCHER
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '8px' }}>
                  {[
                    { id: 1, label: '1. Splash / Loading' },
                    { id: 2, label: '2. Google Login' },
                    { id: 4, label: '3. Select Your Bike' },
                    { id: 5, label: '4. Bluetooth Setup' },
                    { id: 6, label: '5. Home Dashboard' },
                    { id: 8, label: '6. Navigation (Maps)' },
                    { id: 17, label: '8. Settings' },
                    { id: 7, label: '9. Bike Garage' },
                    { id: 9, label: '10. Connection Status' },
                    { id: 18, label: '11. Help & Support' },
                    { id: 3, label: '12. Onboarding Intro' }
                  ].map(item => {
                    const isSelected = currentScreenId === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setCurrentScreenId(item.id)}
                        style={{
                          background: isSelected ? '#FF6600' : '#181B22',
                          color: isSelected ? '#FFF' : '#AAA',
                          border: isSelected ? '1px solid #FF8533' : '1px solid rgba(255,255,255,0.06)',
                          borderRadius: '8px',
                          padding: '10px 12px',
                          textAlign: 'left',
                          fontSize: '11px',
                          fontWeight: '700',
                          cursor: 'pointer'
                        }}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Injectors */}
              <div style={{
                background: '#12141A',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                padding: '18px'
              }}>
                <div style={{ fontSize: '12px', fontWeight: '800', color: '#FF8533', marginBottom: '10px' }}>
                  REAL-TIME QA TEST ACTIONS
                </div>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => {
                      setCurrentScreenId(8);
                      setSimNavigation({
                        destination: 'OMR Service Rd',
                        distanceMeters: 500,
                        turnText: 'In 500m, keep left for exit'
                      });
                    }}
                    style={{ background: '#1A1D24', border: '1px solid #444', color: '#FFF', padding: '8px 14px', borderRadius: '8px', fontSize: '11px', cursor: 'pointer' }}
                  >
                    Simulate Navigation Turn
                  </button>
                  <button
                    onClick={() => setIsBtConnected(!isBtConnected)}
                    style={{ background: '#1A1D24', border: '1px solid #444', color: isBtConnected ? '#FF5247' : '#00E676', padding: '8px 14px', borderRadius: '8px', fontSize: '11px', cursor: 'pointer' }}
                  >
                    {isBtConnected ? 'Simulate BT Disconnect' : 'Simulate BT Reconnect'}
                  </button>
                  <button
                    onClick={() => setCurrentScreenId(7)}
                    style={{ background: '#1A1D24', border: '1px solid #444', color: '#FFF', padding: '8px 14px', borderRadius: '8px', fontSize: '11px', cursor: 'pointer' }}
                  >
                    Switch to Garage
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: BIKES */}
        {activeTab === 'bikes' && (
          <BikeMatrix
            onSelectBikeForSim={(bike) => {
              setActiveBike(prev => ({ ...prev, model: bike.model, year: bike.years }));
              setActiveTab('simulator');
              setCurrentScreenId(6);
            }}
          />
        )}

        {/* TAB 4: ROADMAP */}
        {activeTab === 'roadmap' && <RoadmapTracker />}

        {/* TAB 5: TFT PROTOCOL */}
        {activeTab === 'protocol' && <TftProtocolGuide />}
      </main>

      {/* Footer */}
      <footer style={{
        background: '#07080A',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        padding: '20px 24px',
        fontSize: '12px',
        color: '#777',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            KTM Vibe • Design Reference Matching Suite • Antigravity IDE
          </div>
          <div style={{ color: '#FF8533', fontFamily: 'cursive', fontSize: '1.2rem' }}>
            Ride Smarter
          </div>
        </div>
      </footer>
    </div>
  );
}
