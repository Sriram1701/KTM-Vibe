import React, { useState } from 'react';
import {
  KTM_SCREENS,
  INITIAL_BIKES,
  SERVICE_ITEMS,
  RECENT_RIDES,
  BIKE_COMPATIBILITY_DATABASE
} from './data/mockData';
import PhoneSimulator from './components/PhoneSimulator';
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
  Info
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('simulator'); // 'simulator' | 'gallery' | 'bikes' | 'roadmap' | 'protocol'
  const [currentScreenId, setCurrentScreenId] = useState(6); // Default to Screen 06: Home Dashboard
  const [allBikes, setAllBikes] = useState(INITIAL_BIKES);
  const [activeBike, setActiveBike] = useState(INITIAL_BIKES[0]);
  const [isBtConnected, setIsBtConnected] = useState(true);
  const [serviceList, setServiceList] = useState(SERVICE_ITEMS);
  const [sosActive, setSosActive] = useState(false);
  const [sosCountdown, setSosCountdown] = useState(10);
  const [simNavigation, setSimNavigation] = useState({
    destination: 'Madras Motor Race Track',
    distanceMeters: 180,
    turnText: 'Turn Right onto Grand Southern Trunk Rd'
  });

  // SOS Countdown Interval
  React.useEffect(() => {
    let timer = null;
    if (sosActive && sosCountdown > 0) {
      timer = setInterval(() => {
        setSosCountdown(prev => prev - 1);
      }, 1000);
    } else if (sosCountdown === 0) {
      alert('EMERGENCY SOS DISPATCHED!\nGPS Coordinates (Lat 12.9716, Lng 80.2433) sent to Priya (+91 98401 XXXXX).');
      setSosActive(false);
      setSosCountdown(10);
    }
    return () => clearInterval(timer);
  }, [sosActive, sosCountdown]);

  const handleTriggerSos = () => {
    setCurrentScreenId(13);
    setSosActive(true);
    setSosCountdown(10);
  };

  const handleInjectNextTurn = () => {
    setCurrentScreenId(8);
    setSimNavigation(prev => {
      const turns = [
        { dist: 250, text: 'Keep Left at the Flyover Ramp' },
        { dist: 120, text: 'In 120m, Turn Right onto Rajiv Gandhi Salai' },
        { dist: 50, text: 'In 50m, Turn Sharp Right onto Pitlane Entrance' },
        { dist: 0, text: 'You have arrived at Madras Motor Race Track' }
      ];
      const nextIdx = Math.floor(Math.random() * turns.length);
      return {
        ...prev,
        distanceMeters: turns[nextIdx].dist,
        turnText: turns[nextIdx].text
      };
    });
  };

  const currentScreenMeta = KTM_SCREENS.find(s => s.id === currentScreenId) || KTM_SCREENS[5];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--color-bg-dark)' }}>
      {/* Top Navigation Bar */}
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
          maxWidth: '1440px',
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: '900', letterSpacing: '1.5px', color: '#FFF' }}>
                  KTM <span style={{ color: '#FF6600' }}>VIBE</span>
                </span>
                <span className="ktm-badge ktm-badge-orange" style={{ fontSize: '9px' }}>COMPANION HUB</span>
              </div>
              <div style={{ fontSize: '11px', color: '#8E95A5', letterSpacing: '1px', textTransform: 'uppercase' }}>
                Ride Smarter • Explore Farther • Stay Connected
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav style={{ display: 'flex', gap: '6px' }}>
            {[
              { id: 'simulator', label: 'Phone Simulator', icon: Smartphone },
              { id: 'gallery', label: '20 Screens Matrix', icon: Layers },
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

          {/* Active Status Pill */}
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
                background: isBtConnected ? '#00E676' : '#FF3B30',
                boxShadow: isBtConnected ? '0 0 8px #00E676' : '0 0 8px #FF3B30'
              }} />
              <span style={{ color: '#EEE', fontWeight: '600' }}>{activeBike.model}</span>
              <span style={{ color: isBtConnected ? '#00E676' : '#FF8533', fontSize: '11px', fontWeight: '700' }}>
                {isBtConnected ? 'GATT PAIRED' : 'UNPAIRED'}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main View Area */}
      <main style={{ flex: 1, padding: '24px' }}>
        {/* ========================================================= */}
        {/* TAB 1: PHONE SIMULATOR (Side-by-side interactive tester) */}
        {/* ========================================================= */}
        {activeTab === 'simulator' && (
          <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', gap: '32px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {/* Left: The authentic phone simulator */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', padding: '0 6px' }}>
                <span className="ktm-badge ktm-badge-orange">
                  SCREEN {currentScreenMeta.code}: {currentScreenMeta.name}
                </span>
                <span style={{ fontSize: '11px', color: '#777' }}>
                  Interactive Live State Preview
                </span>
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

            {/* Right: Simulator Controller & Screen Inspector */}
            <div style={{ flex: '1 1 540px', maxWidth: '780px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Event Injectors Bar */}
              <div style={{
                background: '#12141A',
                border: '1px solid rgba(255, 102, 0, 0.3)',
                borderRadius: '16px',
                padding: '20px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Play size={18} color="#FF6600" />
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: '#FFF', margin: 0 }}>
                      REAL-TIME EVENT INJECTORS
                    </h3>
                  </div>
                  <span style={{ fontSize: '11px', color: '#888' }}>Side-by-side QA Testing</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px' }}>
                  <button
                    onClick={handleInjectNextTurn}
                    style={{
                      background: '#181A22',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      padding: '10px 12px',
                      color: '#FFF',
                      fontSize: '11px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <Navigation size={14} color="#FF6600" />
                    Next Nav Turn
                  </button>

                  <button
                    onClick={() => setIsBtConnected(!isBtConnected)}
                    style={{
                      background: '#181A22',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      padding: '10px 12px',
                      color: isBtConnected ? '#FF5247' : '#00E676',
                      fontSize: '11px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <Bluetooth size={14} />
                    {isBtConnected ? 'Simulate BT Drop' : 'Simulate BT Link'}
                  </button>

                  <button
                    onClick={() => {
                      setCurrentScreenId(15);
                    }}
                    style={{
                      background: '#181A22',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      padding: '10px 12px',
                      color: '#FFB300',
                      fontSize: '11px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <Zap size={14} />
                    Rain Alert (80%)
                  </button>

                  <button
                    onClick={handleTriggerSos}
                    style={{
                      background: 'rgba(255,59,48,0.15)',
                      border: '1px solid rgba(255,59,48,0.4)',
                      borderRadius: '8px',
                      padding: '10px 12px',
                      color: '#FF5247',
                      fontSize: '11px',
                      fontWeight: '800',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <AlertTriangle size={14} />
                    Trigger Crash SOS
                  </button>
                </div>
              </div>

              {/* 20 Screens Quick Selector Deck */}
              <div style={{
                background: '#12141A',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                padding: '20px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: '#FFF', margin: 0 }}>
                    JUMP TO ANY OF THE 20 SCREENS
                  </h3>
                  <span style={{ fontSize: '11px', color: '#FF8533' }}>Complete Master Plan Inventory</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '8px', maxHeight: '270px', overflowY: 'auto' }}>
                  {KTM_SCREENS.map(s => {
                    const isCurrent = s.id === currentScreenId;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setCurrentScreenId(s.id)}
                        style={{
                          background: isCurrent ? '#FF6600' : '#181B22',
                          color: isCurrent ? '#FFF' : '#AAA',
                          border: isCurrent ? '1px solid #FF8533' : '1px solid rgba(255,255,255,0.06)',
                          borderRadius: '8px',
                          padding: '10px 8px',
                          textAlign: 'left',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '2px',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <span style={{ fontSize: '10px', fontWeight: '800', opacity: 0.8, fontFamily: 'var(--font-racing)' }}>
                          {s.code}
                        </span>
                        <span style={{ fontSize: '11px', fontWeight: '700', lineHeight: '1.2', color: isCurrent ? '#FFF' : '#DDD' }}>
                          {s.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Screen Specification & QA Card */}
              <div style={{
                background: '#0D0E12',
                border: '1px solid rgba(255, 102, 0, 0.2)',
                borderRadius: '14px',
                padding: '18px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <Info size={16} color="#FF6600" />
                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#FFF' }}>
                    SPECIFICATION FOR SCREEN {currentScreenMeta.code}: {currentScreenMeta.name.toUpperCase()}
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: '#999', lineHeight: '1.6' }}>
                  <div><strong>Category:</strong> <span style={{ color: '#DDD' }}>{currentScreenMeta.category}</span></div>
                  <div><strong>Underlying Tech:</strong> <span style={{ color: '#00E676' }}>Flutter Widget + StateProvider + Android Platform Channels</span></div>
                  <div><strong>Master Plan Rule:</strong> <span style={{ color: '#FF8533' }}>No mock or fabricated data in production release. Explicit unverified labels maintained for unsupported hardware.</span></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: 20 SCREENS MATRIX GALLERY */}
        {/* ========================================================= */}
        {activeTab === 'gallery' && (
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ marginBottom: '24px' }}>
              <div className="ktm-badge ktm-badge-orange" style={{ marginBottom: '8px' }}>MASTER INVENTORY</div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: '#FFF' }}>
                COMPLETE 20-SCREEN INVENTORY MATRIX
              </h2>
              <p style={{ color: '#8E95A5', fontSize: '14px', maxWidth: '800px', marginTop: '6px' }}>
                Every single screen specified in the KTM Vibe Master Plan Section 3. Click any screen card to open it immediately in the Live Phone Simulator.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '16px' }}>
              {KTM_SCREENS.map(screen => (
                <div
                  key={screen.id}
                  style={{
                    background: '#12141A',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '14px',
                    padding: '18px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '12px', fontWeight: '800', color: '#FF6600', fontFamily: 'var(--font-racing)' }}>
                        SCREEN {screen.code}
                      </span>
                      <span className="ktm-badge ktm-badge-neutral" style={{ fontSize: '9px' }}>
                        {screen.category}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.15rem', color: '#FFF', fontFamily: 'var(--font-heading)', margin: '0 0 8px' }}>
                      {screen.name}
                    </h3>
                  </div>

                  <button
                    onClick={() => {
                      setCurrentScreenId(screen.id);
                      setActiveTab('simulator');
                    }}
                    style={{
                      marginTop: '14px',
                      background: '#181A22',
                      border: '1px solid rgba(255,102,0,0.3)',
                      color: '#FF8533',
                      padding: '8px',
                      borderRadius: '8px',
                      fontSize: '11px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    Open in Live Simulator &rarr;
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: BIKE COMPATIBILITY MATRIX */}
        {/* ========================================================= */}
        {activeTab === 'bikes' && (
          <BikeMatrix
            onSelectBikeForSim={(bike) => {
              setActiveBike(prev => ({ ...prev, model: bike.model, year: bike.years }));
              setActiveTab('simulator');
              setCurrentScreenId(6);
            }}
          />
        )}

        {/* ========================================================= */}
        {/* TAB 4: ROADMAP TRACKER & DOD */}
        {/* ========================================================= */}
        {activeTab === 'roadmap' && <RoadmapTracker />}

        {/* ========================================================= */}
        {/* TAB 5: TFT PROTOCOL & ARCHITECTURE */}
        {/* ========================================================= */}
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
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            KTM Vibe • Companion Android App & Web Testing Suite • Antigravity IDE
          </div>
          <div style={{ color: '#FF8533' }}>
            Ready to Race • Respect Rider Safety & TFT Protocol Integrity
          </div>
        </div>
      </footer>
    </div>
  );
}
