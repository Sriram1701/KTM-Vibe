export const KTM_SCREENS = [
  { id: 1, code: '01', name: 'Splash / Loading', category: 'Auth & Onboarding', icon: 'Zap' },
  { id: 2, code: '02', name: 'Google Login', category: 'Auth & Onboarding', icon: 'LogIn' },
  { id: 3, code: '03', name: 'Welcome & Onboarding', category: 'Auth & Onboarding', icon: 'Sparkles' },
  { id: 4, code: '04', name: 'Brand & Model Selection', category: 'Auth & Onboarding', icon: 'Bike' },
  { id: 5, code: '05', name: 'Bluetooth Setup', category: 'Connectivity', icon: 'Bluetooth' },
  { id: 6, code: '06', name: 'Home Dashboard', category: 'Core Ride & Nav', icon: 'Gauge' },
  { id: 7, code: '07', name: 'Bike Garage', category: 'Bike & Maintenance', icon: 'Warehouse' },
  { id: 8, code: '08', name: 'Navigation Companion', category: 'Core Ride & Nav', icon: 'Navigation' },
  { id: 9, code: '09', name: 'Connection Diagnostics', category: 'Connectivity', icon: 'Activity' },
  { id: 10, code: '10', name: 'Ride History & Statistics', category: 'Core Ride & Nav', icon: 'TrendingUp' },
  { id: 11, code: '11', name: 'Service Reminders', category: 'Bike & Maintenance', icon: 'Wrench' },
  { id: 12, code: '12', name: 'Favourite Places', category: 'Core Ride & Nav', icon: 'MapPin' },
  { id: 13, code: '13', name: 'Emergency SOS', category: 'Safety & Utilities', icon: 'AlertTriangle' },
  { id: 14, code: '14', name: 'Fuel & Expense Tracker', category: 'Bike & Maintenance', icon: 'Fuel' },
  { id: 15, code: '15', name: 'Weather & Rain Alerts', category: 'Safety & Utilities', icon: 'CloudRain' },
  { id: 16, code: '16', name: 'Ride Mode HUD', category: 'Core Ride & Nav', icon: 'Compass' },
  { id: 17, code: '17', name: 'Settings & Privacy', category: 'Settings & System', icon: 'Sliders' },
  { id: 18, code: '18', name: 'Help & Support', category: 'Settings & System', icon: 'HelpCircle' },
  { id: 19, code: '19', name: 'Backup & Data Export', category: 'Settings & System', icon: 'Database' },
  { id: 20, code: '20', name: 'Notifications Centre', category: 'Settings & System', icon: 'Bell' },
];

export const INITIAL_BIKES = [
  {
    id: 'bike-1',
    model: 'KTM 390 Duke',
    year: '2024',
    nickname: 'The Orange Beast',
    color: 'Electric Orange & Black',
    odometer: 14280,
    fuelLevel: 78,
    batteryVoltage: 12.8,
    tftStatus: 'Compatible (5" Color TFT Gen 2)',
    tftVerified: true,
    bluetoothPaired: true,
    deviceName: 'KTM_MY_RIDE_94A2',
    imageType: 'duke390'
  },
  {
    id: 'bike-2',
    model: 'KTM RC 390',
    year: '2023',
    nickname: 'Track Weapon',
    color: 'GP Racing Orange / Blue',
    odometer: 6420,
    fuelLevel: 45,
    batteryVoltage: 12.6,
    tftStatus: 'Compatible (TFT Display)',
    tftVerified: true,
    bluetoothPaired: false,
    deviceName: 'KTM_RC_BT_11F0',
    imageType: 'rc390'
  },
  {
    id: 'bike-3',
    model: 'KTM 250 Adventure',
    year: '2024',
    nickname: 'Trail Blazer',
    color: 'Factory Orange / Silver',
    odometer: 21500,
    fuelLevel: 90,
    batteryVoltage: 12.7,
    tftStatus: 'LCD / Unverified TFT Guidance',
    tftVerified: false,
    bluetoothPaired: false,
    deviceName: 'KTM_ADV_BLE_33D1',
    imageType: 'adv250'
  }
];

export const BIKE_COMPATIBILITY_DATABASE = [
  {
    model: 'Duke 390 (Gen 3)',
    years: '2024 - 2026',
    display: '5.0" Color TFT (Type B)',
    btModule: 'KTM MY RIDE Gen 3 BLE',
    turnByTurnStatus: 'Verified Compatible',
    statusBadge: 'verified',
    notes: 'Full turn arrows, distance countdown, call/media telemetry supported over GATT.'
  },
  {
    model: 'Duke 390 (Gen 2)',
    years: '2017 - 2023',
    display: '5.0" Color TFT (Type A)',
    btModule: 'KTM MY RIDE Gen 1/2',
    turnByTurnStatus: 'Supported with KTM app firmware v1.4+',
    statusBadge: 'verified',
    notes: 'Turn arrow symbols & street name display verified.'
  },
  {
    model: 'RC 390',
    years: '2022 - 2026',
    display: 'Color TFT Display',
    btModule: 'KTM MY RIDE integrated',
    turnByTurnStatus: 'Verified Compatible',
    statusBadge: 'verified',
    notes: 'Requires notification listener active on Android.'
  },
  {
    model: 'Duke 250 (Gen 3)',
    years: '2024 - 2026',
    display: '5.0" LCD Display w/ BT',
    btModule: 'KTM Basic BLE',
    turnByTurnStatus: 'Partial (Simple Arrows only)',
    statusBadge: 'partial',
    notes: 'Simplified direction glyphs; street names not rendered by LCD unit.'
  },
  {
    model: 'Duke 160 / 200',
    years: '2020 - 2026',
    display: 'Segmented LCD / Optional TFT variant',
    btModule: 'Model Dependent (Unverified)',
    turnByTurnStatus: 'Unverified Hardware Protocol',
    statusBadge: 'unverified',
    notes: 'CRITICAL: Factory LCD does not accept raw navigation packet frames. Simulated Mode active.'
  },
  {
    model: '390 Adventure',
    years: '2020 - 2026',
    display: 'Color TFT with Offroad Mode',
    btModule: 'KTM MY RIDE Navigation',
    turnByTurnStatus: 'Verified Compatible',
    statusBadge: 'verified',
    notes: 'Turn-by-turn guidance and waypoint countdown verified.'
  },
  {
    model: '890 Duke / Adventure',
    years: '2021 - 2026',
    display: 'Full Color Wide TFT',
    btModule: 'KTM Connectivity Unit',
    turnByTurnStatus: 'Verified Compatible',
    statusBadge: 'verified',
    notes: 'Rich telemetry, gear position, lean angle telemetry sync.'
  }
];

export const RECENT_RIDES = [
  {
    id: 'ride-1',
    date: 'Yesterday, 6:30 PM',
    title: 'East Coast Highway Sunset Blitz',
    distance: 48.6,
    duration: '42m',
    avgSpeed: 69.4,
    topSpeed: 142,
    leanAngle: '42°',
    fuelUsed: '1.5 L'
  },
  {
    id: 'ride-2',
    date: '24 Oct 2026, 7:15 AM',
    title: 'Weekend Mountain Twisties Run',
    distance: 134.2,
    duration: '2h 15m',
    avgSpeed: 59.6,
    topSpeed: 138,
    leanAngle: '46°',
    fuelUsed: '4.2 L'
  },
  {
    id: 'ride-3',
    date: '21 Oct 2026, 8:40 AM',
    title: 'Morning Urban Commute',
    distance: 18.5,
    duration: '28m',
    avgSpeed: 39.2,
    topSpeed: 88,
    leanAngle: '28°',
    fuelUsed: '0.6 L'
  }
];

export const SERVICE_ITEMS = [
  {
    id: 'srv-1',
    title: 'Motorex 15W-50 Engine Oil & Filter',
    dueOdometer: 15000,
    currentOdo: 14280,
    status: 'Due in 720 km',
    urgent: false,
    percentage: 85
  },
  {
    id: 'srv-2',
    title: 'O-Ring Drive Chain Cleaning & Lube',
    dueOdometer: 14500,
    currentOdo: 14280,
    status: 'Due in 220 km (Urgent)',
    urgent: true,
    percentage: 95
  },
  {
    id: 'srv-3',
    title: 'Brembo Front & Rear Brake Fluid',
    dueOdometer: 18000,
    currentOdo: 14280,
    status: 'Due in 3,720 km',
    urgent: false,
    percentage: 40
  },
  {
    id: 'srv-4',
    title: 'Metzeler Sportec M5 Tyres Inspection',
    dueOdometer: 16000,
    currentOdo: 14280,
    status: 'Due in 1,720 km',
    urgent: false,
    percentage: 60
  }
];

export const ROADMAP_PHASES = [
  { phase: 'Phase 1', title: 'Inspect & Scaffold', status: 'Completed', detail: 'Workspace inspected, Flutter project + Vite companion web platform configured.' },
  { phase: 'Phase 2', title: 'UI Foundation & 20 Screens', status: 'In Progress', detail: 'KTM orange/dark design tokens, responsive layout, full 20 screen inventory.' },
  { phase: 'Phase 3', title: 'Authentication & Storage', status: 'Ready', detail: 'Firebase Google Sign-in flow, local SQLite/SharedPreferences store, bike garage sync.' },
  { phase: 'Phase 4', title: 'Bluetooth Architecture', status: 'Ready', detail: 'Android BLE permissions, scan/pair lifecycle, GATT reconnect & RSSI telemetry.' },
  { phase: 'Phase 5', title: 'TFT Feasibility Gate', status: 'Active Policy', detail: 'Do not invent packet protocols. Distinguish BLE pairing from verified TFT support. Safe simulated mode.' },
  { phase: 'Phase 6', title: 'Navigation Engine', status: 'Ready', detail: 'Google Maps deep links, notification listener parsing, direction/distance extraction, HUD simulator.' },
  { phase: 'Phase 7', title: 'Rider Ecosystem Features', status: 'Ready', detail: 'Ride history, service reminders, fuel logs, weather rain warnings, Emergency SOS with GPS.' },
  { phase: 'Phase 8', title: 'Companion Web Portal', status: 'Active', detail: 'Live side-by-side interactive device previewer, compatibility matrix, telemetry simulator.' },
  { phase: 'Phase 9', title: 'Integration QA & Tests', status: 'Pending', detail: 'Automated parser tests, Bluetooth edge case tests, battery & permission validations.' },
  { phase: 'Phase 10', title: 'Release & Signed AAB', status: 'Pending', detail: 'Play Store metadata, privacy policy disclosures, signed Android App Bundle.' }
];
