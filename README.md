# KTM VIBE • Complete Motorcycle Companion Suite

> **"Ride Smarter • Explore Farther • Stay Connected"**

KTM Vibe is a motorcycle companion system engineered specifically for KTM motorcycles (Duke 125/160/200/250/390, RC, and Adventure models). The workspace provides a **dual-stack architecture**:
1. **Android Mobile App (`ktm_vibe_app/`)**: Built with Flutter & Dart for Android (with web/desktop compilation support).
2. **Interactive Companion Web Hub (`ktm_vibe_web/`)**: Built with Vite + React to give you an immediate, side-by-side interactive testing simulator of all 20 screens right inside your browser.

---

## ⚡ Quick Start: Running Side-by-Side

### 1. Launch the Web Companion Hub (Side-by-Side Tester)
The companion web hub is already running locally on:
👉 **[http://localhost:5173](http://localhost:5173)**

To start or restart it manually:
```bash
cd ktm_vibe_web
npm install
npm run dev
```

#### What you can test in the Companion Hub:
- **Interactive Phone Simulator**: Test all 20 screens with live state transitions.
- **Event Injectors**:
  - `Next Nav Turn`: Simulates Google Maps turn prompts (meters countdown, arrows, road names).
  - `Bluetooth Drop / Link`: Simulates BLE connection loss and auto-reconnect.
  - `Rain Alert`: Simulates severe weather and wet tarmac safety warnings.
  - `Trigger Crash SOS`: Tests the 10-second emergency SOS countdown with GPS broadcast.
- **Bike Compatibility Matrix**: Check verified vs unverified TFT models (Duke 390 vs Duke 160).
- **Master Roadmap & DoD**: 10-phase execution plan and Definition of Done verification.

---

### 2. Launch the Flutter Mobile App
```bash
cd ktm_vibe_app
flutter run
```
To run on Chrome:
```bash
flutter run -d chrome
```
To build release APK / AAB for Android:
```bash
flutter build apk --release
flutter build appbundle --release
```

---

## 📱 Complete 20-Screen Inventory

| # | Screen Name | Category | Description |
|---|---|---|---|
| **01** | Splash & Loading | Auth & Onboarding | 3D motorcycle bootup animation, telemetry initialization. |
| **02** | Google Login | Auth & Onboarding | Firebase Google Sign-In & local rider guest mode. |
| **03** | Welcome & Onboarding | Auth & Onboarding | Ecosystem overview, safety guidelines, and permissions. |
| **04** | Model Selection | Auth & Onboarding | Duke, RC, Adventure model and year selection. |
| **05** | Bluetooth Setup | Connectivity | BLE scanning, RSSI signal meter, and pairing verification. |
| **06** | Home Dashboard | Core Ride & Nav | Hero bike render, ODO, range, quick navigation, battery. |
| **07** | Bike Garage | Bike & Maintenance | Multi-bike garage, active bike switcher, add machine. |
| **08** | Navigation Companion | Core Ride & Nav | Factory TFT mirror, turn arrow, meters countdown, road name. |
| **09** | Connection Diagnostics | Connectivity | GATT packet stream, BLE handshake, packet loss monitor. |
| **10** | Ride History & Stats | Core Ride & Nav | Past ride logs, max lean angle, top & average speed. |
| **11** | Service Reminders | Bike & Maintenance | Oil, chain lube, brake fluid maintenance tracker. |
| **12** | Favourite Places | Core Ride & Nav | Saved destinations, racetrack waypoints, 1-tap route. |
| **13** | Emergency SOS | Safety & Utilities | 10s countdown, GPS coordinate SMS broadcast. |
| **14** | Fuel & Expense Tracker | Bike & Maintenance | Fuel logs, odometer tracking, real-time km/L mileage. |
| **15** | Weather & Rain Alerts | Safety & Utilities | Live forecast, rain radar alert, grip advisory. |
| **16** | Ride Mode HUD | Core Ride & Nav | Distraction-free high-contrast HUD, giant speedometer. |
| **17** | Settings & Privacy | Settings & System | Speed units (km/h vs mph), dark theme, BLE service toggle. |
| **18** | Help & Support | Settings & System | Duke 160 compatibility guide, FAQ, pairing steps. |
| **19** | Backup & Data Export | Settings & System | JSON data export, account deletion workflow. |
| **20** | Notification Centre | Settings & System | Push notification feed for service, weather, and reconnects. |

---

## 🛡️ Critical Hardware & Protocol Safeguards
Per **Section 5 of the Master Plan**:
- **TFT Verification Gate**: Bluetooth pairing alone does not guarantee factory TFT navigation.
- **Duke 160 Notice**: Unverified models automatically operate in **Simulated Guidance Mode** on the rider's phone or handlebar mount, ensuring communication safety without attempting raw ECU writes.
