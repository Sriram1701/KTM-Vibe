import React from 'react';
import ktmDukeHero from '../assets/ktm_duke_hero.jpg';
import ktmRidingHighway from '../assets/ktm_riding_highway.jpg';
import {
  Bluetooth, Navigation, MapPin, Search, Mic, Menu, Bell, Check,
  ChevronRight, ArrowLeft, RefreshCw, Smartphone, Layers, CheckCircle2,
  Compass, Shield, AlertTriangle
} from 'lucide-react';

export default function PosterOverview({ onSelectScreen }) {
  return (
    <div style={{
      background: '#0B0C0E',
      color: '#FFFFFF',
      padding: '24px',
      borderRadius: '20px',
      border: '1px solid rgba(255,102,0,0.2)',
      boxShadow: '0 20px 60px rgba(0,0,0,0.9)'
    }}>
      {/* Poster Top Brand Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        paddingBottom: '20px',
        marginBottom: '28px',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Brand Logo & Subtitle */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '2.6rem',
              fontWeight: '900',
              fontStyle: 'italic',
              color: '#FF6600',
              letterSpacing: '2px',
              textShadow: '0 0 15px rgba(255,102,0,0.4)'
            }}>
              KTM
            </span>
            <span style={{
              fontFamily: 'cursive, sans-serif',
              fontSize: '2.4rem',
              fontWeight: '700',
              fontStyle: 'italic',
              color: '#FF7700',
              letterSpacing: '1px'
            }}>
              Vibe
            </span>
          </div>
          <div style={{ fontSize: '11px', color: '#8E95A5', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Connect • Ride • Explore
          </div>
        </div>

        {/* Center Tagline */}
        <div style={{
          display: 'flex',
          gap: '16px',
          fontSize: '11px',
          fontWeight: '700',
          letterSpacing: '2.5px',
          color: '#A0AABF',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-heading)'
        }}>
          <span>YOUR RIDE</span>
          <span style={{ color: '#444' }}>|</span>
          <span>YOUR ROUTE</span>
          <span style={{ color: '#444' }}>|</span>
          <span>YOUR VIBE</span>
        </div>

        {/* Right Theme Indicators */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            <span style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#FF6600', boxShadow: '0 0 8px #FF6600' }} />
            <span style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#1A1D24', border: '1px solid #444' }} />
            <span style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#FFFFFF' }} />
          </div>
          <div style={{ fontSize: '11px', color: '#888' }}>
            <strong style={{ color: '#FFF' }}>KTM THEME</strong>: Orange • Dark • Premium
          </div>
        </div>
      </div>

      {/* Row 1 Screens (1 to 7) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '16px',
        marginBottom: '32px'
      }}>
        {/* Screen 1: Splash / Loading */}
        <MiniScreenFrame
          number="1"
          title="Splash / Loading"
          subtitle="3D bike animation + logo reveal"
          onClick={() => onSelectScreen(1)}
        >
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '10px' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: '900', fontStyle: 'italic', color: '#FF6600', margin: 0 }}>
              KTM <span style={{ fontFamily: 'cursive', color: '#FF8800' }}>Vibe</span>
            </div>
            <div style={{ fontSize: '7px', letterSpacing: '1px', color: '#888', marginBottom: '8px' }}>
              Connect • Ride • Explore
            </div>
            <img src={ktmDukeHero} alt="KTM Duke" style={{ width: '100%', height: '110px', objectFit: 'contain', filter: 'drop-shadow(0 0 10px rgba(255,102,0,0.5))' }} />
            <div style={{ width: '80%', height: '3px', background: '#222', borderRadius: '2px', overflow: 'hidden', marginTop: '10px' }}>
              <div style={{ width: '65%', height: '100%', background: '#FF6600' }} />
            </div>
            <div style={{ fontSize: '7px', color: '#666', marginTop: '4px' }}>Loading your ride experience...</div>
          </div>
        </MiniScreenFrame>

        {/* Screen 2: Google Login */}
        <MiniScreenFrame
          number="2"
          title="Google Login"
          subtitle="Firebase Authentication"
          onClick={() => onSelectScreen(2)}
        >
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '12px' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: '900', fontStyle: 'italic', color: '#FF6600', margin: 0 }}>
              KTM <span style={{ fontFamily: 'cursive', color: '#FF8800' }}>Vibe</span>
            </div>
            <div style={{ fontSize: '9px', color: '#CCC', margin: '20px 0 16px' }}>Sign in with Google to continue</div>
            <div style={{
              background: '#FFF',
              color: '#222',
              borderRadius: '20px',
              padding: '8px 12px',
              fontSize: '9px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              width: '100%',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
            }}>
              <span style={{ color: '#4285F4', fontWeight: '900' }}>G</span> Continue with Google
            </div>
            <div style={{ fontSize: '6px', color: '#555', marginTop: '30px' }}>
              By continuing, you agree to our Terms & Privacy Policy
            </div>
          </div>
        </MiniScreenFrame>

        {/* Screen 3: Select Your Bike */}
        <MiniScreenFrame
          number="3"
          title="Select Your Bike"
          subtitle="Brand -> Model -> Year"
          onClick={() => onSelectScreen(4)}
        >
          <div style={{ flex: 1, padding: '8px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '10px', fontWeight: '800', color: '#FFF' }}>Select Your Bike</div>
            <div style={{ fontSize: '7px', color: '#888', marginBottom: '6px' }}>Choose your KTM bike details</div>


            {/* 2x2 Model grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', marginBottom: '6px' }}>
              <div style={{ border: '1px solid #FF6600', borderRadius: '6px', padding: '4px', textAlign: 'center', background: 'rgba(255,102,0,0.1)' }}>
                <div style={{ fontSize: '7px', fontWeight: '700', color: '#FFF' }}>Duke 160</div>
              </div>
              <div style={{ border: '1px solid #333', borderRadius: '6px', padding: '4px', textAlign: 'center', background: '#14161C' }}>
                <div style={{ fontSize: '7px', color: '#AAA' }}>Duke 200</div>
              </div>
              <div style={{ border: '1px solid #333', borderRadius: '6px', padding: '4px', textAlign: 'center', background: '#14161C' }}>
                <div style={{ fontSize: '7px', color: '#AAA' }}>Duke 250</div>
              </div>
              <div style={{ border: '1px solid #333', borderRadius: '6px', padding: '4px', textAlign: 'center', background: '#14161C' }}>
                <div style={{ fontSize: '7px', color: '#AAA' }}>Duke 390</div>
              </div>
            </div>

            <div style={{ fontSize: '7px', color: '#888', marginBottom: '2px' }}>Year</div>
            <div style={{ display: 'flex', gap: '4px', marginBottom: '8px' }}>
              <span style={{ fontSize: '7px', color: '#888', padding: '2px 4px', border: '1px solid #333', borderRadius: '3px' }}>2024</span>
              <span style={{ fontSize: '7px', color: '#FFF', background: '#FF6600', padding: '2px 4px', borderRadius: '3px', fontWeight: '700' }}>2025</span>
              <span style={{ fontSize: '7px', color: '#888', padding: '2px 4px', border: '1px solid #333', borderRadius: '3px' }}>2026</span>
            </div>

            <button style={{ marginTop: 'auto', background: '#FF6600', border: 'none', color: '#FFF', padding: '5px', borderRadius: '4px', fontSize: '8px', fontWeight: '800' }}>
              Next
            </button>
          </div>
        </MiniScreenFrame>

        {/* Screen 4: Bluetooth Setup */}
        <MiniScreenFrame
          number="4"
          title="Bluetooth Setup"
          subtitle="Pair during setup"
          onClick={() => onSelectScreen(5)}
        >
          <div style={{ flex: 1, padding: '8px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '10px', fontWeight: '800', color: '#FFF' }}>Bluetooth Setup</div>
            <div style={{ fontSize: '7px', color: '#888', marginBottom: '6px' }}>Pair your bike with the app</div>

            {/* Glowing bike + BT graphic */}
            <div style={{ textAlign: 'center', margin: '4px 0' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,102,0,0.2)', border: '1px solid #FF6600' }}>
                <Bluetooth size={16} color="#FF6600" />
              </div>
            </div>

            {/* Numbered steps */}
            <div style={{ fontSize: '7px', color: '#AAA', lineHeight: '1.4', margin: '6px 0' }}>
              <div>1. Enable Bluetooth</div>
              <div>2. Allow location & permissions</div>
              <div>3. Scan for KTM devices</div>
              <div>4. Pair and connect</div>
            </div>

            {/* Detected Device Card */}
            <div style={{ background: '#14161C', border: '1px solid #FF6600', borderRadius: '6px', padding: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '7px', fontWeight: '700', color: '#FFF' }}>KTM_DUKE_160</div>
                <div style={{ fontSize: '6px', color: '#00E676' }}>Available</div>
              </div>
              <span style={{ background: '#FF6600', color: '#FFF', fontSize: '6px', fontWeight: '700', padding: '3px 6px', borderRadius: '3px' }}>
                Connect
              </span>
            </div>

            <div style={{ textAlign: 'center', fontSize: '6px', color: '#FF8533', marginTop: 'auto' }}>
              Need help? View pairing guide
            </div>
          </div>
        </MiniScreenFrame>

        {/* Screen 5: Home Dashboard */}
        <MiniScreenFrame
          number="5"
          title="Home Dashboard"
          subtitle="Bike visual + connection card"
          onClick={() => onSelectScreen(6)}
        >
          <div style={{ flex: 1, padding: '8px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <Menu size={12} color="#AAA" />
              <div style={{ fontSize: '9px', fontWeight: '900', fontStyle: 'italic', color: '#FF6600' }}>KTM <span style={{ fontFamily: 'cursive' }}>Vibe</span></div>
              <Bell size={12} color="#AAA" />
            </div>

            <img src={ktmDukeHero} alt="Duke" style={{ width: '100%', height: '80px', objectFit: 'contain' }} />

            <div style={{ margin: '4px 0' }}>
              <div style={{ fontSize: '9px', fontWeight: '800', color: '#FFF' }}>Duke 160 (2025)</div>
              <div style={{ fontSize: '7px', color: '#00E676' }}>• Connected</div>
            </div>

            {/* Connection Card */}
            <div style={{ background: '#14161C', border: '1px solid #333', borderRadius: '6px', padding: '6px', marginBottom: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Bluetooth size={10} color="#00E676" />
                <span style={{ fontSize: '7px', fontWeight: '700', color: '#FFF' }}>Bluetooth Connected</span>
              </div>
              <div style={{ fontSize: '6px', color: '#00E676', marginTop: '2px' }}>TFT Support: Available</div>
            </div>

            <button style={{ background: '#FF6600', border: 'none', color: '#FFF', padding: '6px', borderRadius: '4px', fontSize: '8px', fontWeight: '800' }}>
              Start Navigation
            </button>

            {/* Bottom mini bar */}
            <div style={{ display: 'flex', justifyContent: 'space-around', borderTop: '1px solid #222', paddingTop: '4px', marginTop: 'auto', fontSize: '6px' }}>
              <span style={{ color: '#FF6600', fontWeight: '700' }}>My Bikes</span>
              <span style={{ color: '#666' }}>Settings</span>
              <span style={{ color: '#666' }}>Help</span>
            </div>
          </div>
        </MiniScreenFrame>

        {/* Screen 6: Navigation (Google Maps) */}
        <MiniScreenFrame
          number="6"
          title="Navigation (Google Maps)"
          subtitle="Route planning & turn-by-turn"
          onClick={() => onSelectScreen(8)}
        >
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
            {/* Top Search bar */}
            <div style={{ padding: '6px 8px', background: '#12141A', borderBottom: '1px solid #222', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Search size={10} color="#888" />
              <span style={{ fontSize: '7px', color: '#777' }}>Search here</span>
              <Mic size={10} color="#888" style={{ marginLeft: 'auto' }} />
            </div>

            {/* Simulated Map */}
            <div style={{ flex: 1, background: '#181E29', position: 'relative' }}>
              {/* Route line */}
              <svg width="100%" height="100%" style={{ position: 'absolute' }}>
                <path d="M 40 120 Q 90 80, 110 30" fill="none" stroke="#FF6600" strokeWidth="4" />
                <circle cx="110" cy="30" r="5" fill="#4285F4" />
                <circle cx="40" cy="120" r="4" fill="#00E676" />
              </svg>
              <div style={{ position: 'absolute', bottom: '4px', left: '6px', fontSize: '7px', color: '#555', fontWeight: '700' }}>Google</div>
            </div>

            {/* Bottom Turn Card */}
            <div style={{ background: '#101217', padding: '8px', borderTop: '1px solid #FF6600' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ background: '#4285F4', borderRadius: '50%', padding: '4px', display: 'flex' }}>
                  <Navigation size={12} color="#FFF" style={{ transform: 'rotate(45deg)' }} />
                </div>
                <div>
                  <div style={{ fontSize: '8px', fontWeight: '800', color: '#FFF' }}>Turn right</div>
                  <div style={{ fontSize: '7px', color: '#00E676', fontWeight: '700' }}>2.0 km • OMR Service Rd</div>
                </div>
              </div>
              <div style={{ fontSize: '6px', color: '#888', marginTop: '4px' }}>12 min • 5.8 km • 10:22 AM</div>
            </div>
          </div>
        </MiniScreenFrame>

        {/* Screen 7: TFT Display (Example) */}
        <MiniScreenFrame
          number="7"
          title="TFT Display"
          subtitle="Turn + Distance + Road Name"
          onClick={() => onSelectScreen(8)}
        >
          {/* Bezel frame */}
          <div style={{
            flex: 1,
            background: '#050608',
            border: '2px solid #2A2E38',
            borderRadius: '8px',
            margin: '4px',
            padding: '8px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            {/* Top Turn prompt */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ background: 'rgba(66,133,244,0.2)', border: '1px solid #4285F4', borderRadius: '4px', padding: '3px', display: 'flex' }}>
                <Navigation size={14} color="#4285F4" style={{ transform: 'rotate(45deg)' }} />
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '7px', fontWeight: '700', color: '#FFF' }}>Turn Right</div>
                <div style={{ fontSize: '8px', fontWeight: '900', color: '#00E676' }}>2.0 km</div>
                <div style={{ fontSize: '6px', color: '#888' }}>OMR Service Rd</div>
              </div>
            </div>

            {/* Giant Speed & Gear */}
            <div style={{ textAlign: 'center', margin: '4px 0' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: '900', color: '#FFF', fontFamily: 'var(--font-racing)', lineHeight: 1 }}>
                48
              </div>
              <div style={{ fontSize: '7px', color: '#FF6600', letterSpacing: '1px' }}>km/h</div>
              <div style={{ display: 'inline-block', background: '#00E676', color: '#000', fontWeight: '900', fontSize: '9px', padding: '1px 5px', borderRadius: '2px', marginTop: '2px' }}>
                4
              </div>
            </div>

            {/* KTM Footer */}
            <div style={{ textAlign: 'center', fontSize: '7px', fontWeight: '900', fontStyle: 'italic', color: '#FF6600', letterSpacing: '1px' }}>
              KTM
            </div>
          </div>
        </MiniScreenFrame>
      </div>

      {/* Row 2 Screens (8 to 12) + Key Features */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '16px',
        alignItems: 'start'
      }}>
        {/* Screen 8: Settings */}
        <MiniScreenFrame
          number="8"
          title="Settings"
          subtitle="Profile, bike, app preferences"
          onClick={() => onSelectScreen(17)}
        >
          <div style={{ flex: 1, padding: '8px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
              <ArrowLeft size={10} color="#FFF" />
              <span style={{ fontSize: '9px', fontWeight: '800', color: '#FFF' }}>Settings</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '7px' }}>
              <div style={{ background: '#14161C', padding: '4px 6px', borderRadius: '4px' }}>
                <div style={{ color: '#FFF', fontWeight: '700' }}>Account</div>
                <div style={{ color: '#666', fontSize: '6px' }}>Google Account</div>
              </div>
              <div style={{ background: '#14161C', padding: '4px 6px', borderRadius: '4px' }}>
                <div style={{ color: '#FFF', fontWeight: '700' }}>Bike Settings</div>
                <div style={{ color: '#666', fontSize: '6px' }}>Duke 160 (2025)</div>
              </div>
              <div style={{ background: '#14161C', padding: '4px 6px', borderRadius: '4px' }}>
                <div style={{ color: '#FFF', fontWeight: '700' }}>Bluetooth</div>
                <div style={{ color: '#00E676', fontSize: '6px' }}>Connected</div>
              </div>
              <div style={{ background: '#14161C', padding: '4px 6px', borderRadius: '4px' }}>
                <div style={{ color: '#FFF', fontWeight: '700' }}>Navigation</div>
                <div style={{ color: '#666', fontSize: '6px' }}>Google Maps</div>
              </div>
            </div>

            {/* Bottom bar */}
            <div style={{ display: 'flex', justifyContent: 'space-around', borderTop: '1px solid #222', paddingTop: '4px', marginTop: 'auto', fontSize: '6px' }}>
              <span style={{ color: '#666' }}>Home</span>
              <span style={{ color: '#666' }}>Garage</span>
              <span style={{ color: '#FF6600', fontWeight: '700' }}>Settings</span>
              <span style={{ color: '#666' }}>Help</span>
            </div>
          </div>
        </MiniScreenFrame>

        {/* Screen 9: Bike Garage */}
        <MiniScreenFrame
          number="9"
          title="Bike Garage"
          subtitle="Multiple bikes support"
          onClick={() => onSelectScreen(7)}
        >
          <div style={{ flex: 1, padding: '8px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '9px', fontWeight: '800', color: '#FFF' }}>My Garage</span>
              <span style={{ fontSize: '7px', color: '#FF6600', fontWeight: '700' }}>+ Add Bike</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ background: '#14161C', border: '1px solid #FF6600', borderRadius: '6px', padding: '6px' }}>
                <div style={{ fontSize: '8px', fontWeight: '800', color: '#FFF' }}>Duke 160</div>
                <div style={{ fontSize: '6px', color: '#888' }}>2025 • <span style={{ color: '#00E676' }}>Connected</span></div>
              </div>
              <div style={{ background: '#14161C', border: '1px solid #333', borderRadius: '6px', padding: '6px' }}>
                <div style={{ fontSize: '8px', fontWeight: '700', color: '#AAA' }}>Duke 250</div>
                <div style={{ fontSize: '6px', color: '#666' }}>2024 • Not Connected</div>
              </div>
            </div>

            {/* Bottom bar */}
            <div style={{ display: 'flex', justifyContent: 'space-around', borderTop: '1px solid #222', paddingTop: '4px', marginTop: 'auto', fontSize: '6px' }}>
              <span style={{ color: '#666' }}>Home</span>
              <span style={{ color: '#FF6600', fontWeight: '700' }}>Garage</span>
              <span style={{ color: '#666' }}>Settings</span>
              <span style={{ color: '#666' }}>Help</span>
            </div>
          </div>
        </MiniScreenFrame>

        {/* Screen 10: Connection Status */}
        <MiniScreenFrame
          number="10"
          title="Connection Status"
          subtitle="Live status + troubleshooting"
          onClick={() => onSelectScreen(9)}
        >
          <div style={{ flex: 1, padding: '8px', display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
            <div style={{ fontSize: '9px', fontWeight: '800', color: '#FFF', textAlign: 'left', marginBottom: '6px' }}>
              Connection Status
            </div>

            {/* Status ring */}
            <div style={{ margin: '6px 0' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                border: '2px solid #00E676',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0,230,118,0.1)'
              }}>
                <Bluetooth size={20} color="#00E676" />
              </div>
              <div style={{ fontSize: '8px', fontWeight: '800', color: '#00E676', marginTop: '2px' }}>Connected</div>
              <div style={{ fontSize: '6px', color: '#888' }}>KTM_DUKE_160</div>
            </div>

            {/* Diagnostics table */}
            <div style={{ background: '#12141A', borderRadius: '6px', padding: '4px 6px', fontSize: '6px', textAlign: 'left', marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#888', marginBottom: '2px' }}>
                <span>Bike</span><span style={{ color: '#FFF' }}>Duke 160 (2025)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#888', marginBottom: '2px' }}>
                <span>TFT Display</span><span style={{ color: '#00E676' }}>Supported</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#888', marginBottom: '2px' }}>
                <span>Navigation</span><span style={{ color: '#00E676' }}>Active</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#888' }}>
                <span>Signal</span><span style={{ color: '#00E676' }}>••••</span>
              </div>
            </div>

            <button style={{ marginTop: 'auto', background: '#FF3B30', border: 'none', color: '#FFF', padding: '4px', borderRadius: '4px', fontSize: '7px', fontWeight: '700' }}>
              Disconnect
            </button>
          </div>
        </MiniScreenFrame>

        {/* Screen 11: Help & Support */}
        <MiniScreenFrame
          number="11"
          title="Help & Support"
          subtitle="Guides & troubleshooting"
          onClick={() => onSelectScreen(18)}
        >
          <div style={{ flex: 1, padding: '8px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '9px', fontWeight: '800', color: '#FFF', marginBottom: '6px' }}>Help & Support</div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '7px' }}>
              <div style={{ background: '#14161C', padding: '4px 6px', borderRadius: '4px' }}>
                <div style={{ color: '#FFF', fontWeight: '700' }}>How to Pair Your Bike</div>
                <div style={{ color: '#666', fontSize: '6px' }}>Step-by-step guide</div>
              </div>
              <div style={{ background: '#14161C', padding: '4px 6px', borderRadius: '4px' }}>
                <div style={{ color: '#FFF', fontWeight: '700' }}>TFT Compatibility</div>
                <div style={{ color: '#666', fontSize: '6px' }}>Supported models & features</div>
              </div>
              <div style={{ background: '#14161C', padding: '4px 6px', borderRadius: '4px' }}>
                <div style={{ color: '#FFF', fontWeight: '700' }}>Troubleshooting</div>
                <div style={{ color: '#666', fontSize: '6px' }}>Connection issues, no nav</div>
              </div>
              <div style={{ background: '#14161C', padding: '4px 6px', borderRadius: '4px' }}>
                <div style={{ color: '#FFF', fontWeight: '700' }}>Contact Support</div>
                <div style={{ color: '#666', fontSize: '6px' }}>Get help from our team</div>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: 'auto', paddingTop: '6px' }}>
              <div style={{ fontSize: '8px', fontWeight: '900', fontStyle: 'italic', color: '#FF6600' }}>KTM <span style={{ fontFamily: 'cursive' }}>Vibe</span></div>
              <div style={{ fontSize: '6px', color: '#666' }}>Ride Smart. Ride Better.</div>
            </div>
          </div>
        </MiniScreenFrame>

        {/* Screen 12: Onboarding Intro */}
        <MiniScreenFrame
          number="12"
          title="Onboarding Intro"
          subtitle="Brand & model selection flow"
          onClick={() => onSelectScreen(3)}
        >
          <div style={{
            flex: 1,
            position: 'relative',
            backgroundImage: `url(${ktmRidingHighway})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '10px',
            borderRadius: '10px',
            overflow: 'hidden'
          }}>
            {/* Dark gradient overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.9) 100%)', zIndex: 1 }} />

            <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
              <div style={{ fontSize: '11px', fontWeight: '900', fontStyle: 'italic', color: '#FF6600' }}>KTM <span style={{ fontFamily: 'cursive' }}>Vibe</span></div>
            </div>

            <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
              <div style={{ fontSize: '9px', fontWeight: '900', color: '#FFF', lineHeight: '1.2' }}>Smart Navigation for Your KTM</div>
              <div style={{ fontSize: '6px', color: '#DDD', margin: '4px 0 8px' }}>
                Connect your bike, get turn-by-turn navigation on your TFT and ride smarter.
              </div>
              <button style={{ width: '100%', background: '#FF6600', border: 'none', color: '#FFF', padding: '5px', borderRadius: '4px', fontSize: '7px', fontWeight: '800' }}>
                Get Started
              </button>
              <div style={{ fontSize: '6px', color: '#AAA', marginTop: '4px' }}>Skip</div>
            </div>
          </div>
        </MiniScreenFrame>

        {/* Right Panel: Key Features List */}
        <div style={{
          background: 'linear-gradient(135deg, #13151C 0%, #0D0E12 100%)',
          border: '1px solid rgba(255,102,0,0.3)',
          borderRadius: '16px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '340px'
        }}>
          <div>
            <h3 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.25rem',
              fontWeight: '900',
              color: '#FF6600',
              letterSpacing: '1px',
              marginBottom: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span>Key Features</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                'Google Sign-In (Firebase)',
                'KTM Brand & Model Selection',
                'Bluetooth Pairing (Setup + Auto Reconnect)',
                'Large Bike Visual + Connection Card',
                'Google Maps Integration',
                'TFT Navigation (Turn + Distance + Road)',
                'Multiple Bikes Garage',
                'Cloud Profile + Local Bike Settings',
                'Android Background Support',
                'Online First (Offline Map later)',
                'English UI',
                'Free (Initial Release)'
              ].map((feat, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#E0E6ED' }}>
                  <div style={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    background: 'rgba(255,102,0,0.2)',
                    border: '1px solid #FF6600',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Check size={9} color="#FF6600" strokeWidth={3} />
                  </div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: 'right', marginTop: '20px' }}>
            <span style={{
              fontFamily: 'cursive, sans-serif',
              fontSize: '1.6rem',
              fontWeight: '700',
              fontStyle: 'italic',
              color: '#FF7700',
              textShadow: '0 0 10px rgba(255,102,0,0.5)'
            }}>
              Ride Smarter
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniScreenFrame({ number, title, subtitle, children, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'transform 0.2s ease, border-color 0.2s ease'
      }}
      className="poster-card-hover"
    >
      {/* Phone Bezel */}
      <div style={{
        height: '320px',
        background: '#090A0D',
        borderRadius: '20px',
        border: '3px solid #1E222B',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 8px 24px rgba(0,0,0,0.7)',
        position: 'relative'
      }}>
        {/* Status bar */}
        <div style={{
          height: '18px',
          background: '#000',
          padding: '0 10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '7px',
          color: '#AAA',
          fontFamily: 'var(--font-racing)'
        }}>
          <span>9:41</span>
          <span>100%</span>
        </div>

        {/* Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {children}
        </div>
      </div>

      {/* Screen Title Label */}
      <div style={{ marginTop: '8px', padding: '0 4px' }}>
        <div style={{ fontSize: '11px', fontWeight: '800', color: '#FFF' }}>
          {number}. {title}
        </div>
        <div style={{ fontSize: '9px', color: '#888', marginTop: '1px' }}>
          {subtitle}
        </div>
      </div>
    </div>
  );
}
