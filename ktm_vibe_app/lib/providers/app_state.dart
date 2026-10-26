import 'dart:async';
import 'package:flutter/material.dart';
import '../models/app_models.dart';

class AppStateProvider extends ChangeNotifier {
  // Bikes & Garage
  final List<BikeProfile> _bikes = [
    BikeProfile(
      id: 'bike-1',
      model: 'KTM 390 Duke',
      year: '2024',
      nickname: 'The Orange Beast',
      odometer: 14280,
      fuelLevel: 78,
      batteryVoltage: 12.8,
      tftStatus: 'Compatible (5" Color TFT Gen 2)',
      tftVerified: true,
      deviceName: 'KTM_MY_RIDE_94A2',
    ),
    BikeProfile(
      id: 'bike-2',
      model: 'KTM RC 390',
      year: '2023',
      nickname: 'Track Weapon',
      odometer: 6420,
      fuelLevel: 45,
      batteryVoltage: 12.6,
      tftStatus: 'Compatible (TFT Display)',
      tftVerified: true,
      deviceName: 'KTM_RC_BT_11F0',
    ),
    BikeProfile(
      id: 'bike-3',
      model: 'KTM 250 Adventure',
      year: '2024',
      nickname: 'Trail Blazer',
      odometer: 21500,
      fuelLevel: 90,
      batteryVoltage: 12.7,
      tftStatus: 'LCD / Unverified TFT Guidance',
      tftVerified: false,
      deviceName: 'KTM_ADV_BLE_33D1',
    ),
  ];

  late BikeProfile _activeBike;
  bool _isBluetoothConnected = true;
  final int _currentNavSpeed = 74;

  // Navigation State
  NavStep _navStep = NavStep(
    destination: 'Madras Motor Race Track',
    distanceMeters: 180,
    turnInstruction: 'Turn Right onto Grand Southern Trunk Rd',
    roadName: 'GST Road / NH 32',
  );

  // Service Reminders
  List<ServiceReminder> _serviceReminders = [
    ServiceReminder(
      id: 'srv-1',
      title: 'Motorex 15W-50 Engine Oil & Filter',
      dueOdometer: 15000,
      status: 'Due in 720 km',
      urgent: false,
      percentage: 0.85,
    ),
    ServiceReminder(
      id: 'srv-2',
      title: 'Drive Chain Cleaning & O-Ring Lube',
      dueOdometer: 14500,
      status: 'Due in 220 km (Urgent)',
      urgent: true,
      percentage: 0.95,
    ),
    ServiceReminder(
      id: 'srv-3',
      title: 'Brembo Brake Fluid Flushing',
      dueOdometer: 18000,
      status: 'Due in 3,720 km',
      urgent: false,
      percentage: 0.40,
    ),
  ];

  // Ride History
  final List<RideRecord> _rideRecords = [
    RideRecord(
      id: 'ride-1',
      date: 'Yesterday, 6:30 PM',
      title: 'East Coast Highway Sunset Blitz',
      distanceKm: 48.6,
      durationStr: '42m',
      avgSpeed: 69.4,
      topSpeed: 142.0,
      leanAngle: '42°',
    ),
    RideRecord(
      id: 'ride-2',
      date: '24 Oct 2026, 7:15 AM',
      title: 'Yelagiri Mountain Twisties Run',
      distanceKm: 134.2,
      durationStr: '2h 15m',
      avgSpeed: 59.6,
      topSpeed: 138.0,
      leanAngle: '46°',
    ),
  ];

  // Fuel Entries
  final List<FuelEntry> _fuelEntries = [
    FuelEntry(
      id: 1,
      date: '25 Oct 2026',
      litres: 10.2,
      cost: 1050.0,
      odometer: 14200,
      mileage: 33.5,
    ),
    FuelEntry(
      id: 2,
      date: '18 Oct 2026',
      litres: 9.8,
      cost: 1010.0,
      odometer: 13860,
      mileage: 34.2,
    ),
  ];

  // Emergency SOS
  bool _isSosActive = false;
  int _sosCountdown = 10;
  Timer? _sosTimer;

  AppStateProvider() {
    _activeBike = _bikes[0];
  }

  // Getters
  List<BikeProfile> get bikes => _bikes;
  BikeProfile get activeBike => _activeBike;
  bool get isBluetoothConnected => _isBluetoothConnected;
  NavStep get navStep => _navStep;
  int get currentNavSpeed => _currentNavSpeed;
  List<ServiceReminder> get serviceReminders => _serviceReminders;
  List<RideRecord> get rideRecords => _rideRecords;
  List<FuelEntry> get fuelEntries => _fuelEntries;
  bool get isSosActive => _isSosActive;
  int get sosCountdown => _sosCountdown;

  // Actions
  void setActiveBike(BikeProfile bike) {
    _activeBike = bike;
    notifyListeners();
  }

  void addBike(BikeProfile bike) {
    _bikes.add(bike);
    notifyListeners();
  }

  void toggleBluetooth() {
    _isBluetoothConnected = !_isBluetoothConnected;
    notifyListeners();
  }

  void nextNavTurn() {
    final turns = [
      NavStep(
        destination: _navStep.destination,
        distanceMeters: 120,
        turnInstruction: 'In 120m, Turn Right onto Rajiv Gandhi Salai',
        roadName: 'OMR Expressway',
      ),
      NavStep(
        destination: _navStep.destination,
        distanceMeters: 50,
        turnInstruction: 'In 50m, Keep Left at Flyover Ramp',
        roadName: 'Track Sector 2 Approach',
      ),
      NavStep(
        destination: _navStep.destination,
        distanceMeters: 0,
        turnInstruction: 'You have arrived at Madras Motor Race Track',
        roadName: 'Main Pitlane Entrance',
      ),
    ];
    _navStep = turns[DateTime.now().second % turns.length];
    notifyListeners();
  }

  void resetServiceReminder(String id) {
    _serviceReminders = _serviceReminders.map((s) {
      if (s.id == id) {
        return s.copyWith(
          status: 'Serviced • Next due in 5,000 km',
          urgent: false,
          percentage: 0.1,
          dueOdometer: _activeBike.odometer + 5000,
        );
      }
      return s;
    }).toList();
    notifyListeners();
  }

  void addFuelLog(double litres, double cost, int odo) {
    final lastOdo = _fuelEntries.isNotEmpty ? _fuelEntries.first.odometer : (_activeBike.odometer - 300);
    final diff = (odo - lastOdo).clamp(10, 800);
    final calcMileage = double.parse((diff / litres).toStringAsFixed(1));

    _fuelEntries.insert(
      0,
      FuelEntry(
        id: DateTime.now().millisecondsSinceEpoch,
        date: 'Today',
        litres: litres,
        cost: cost,
        odometer: odo,
        mileage: calcMileage,
      ),
    );
    notifyListeners();
  }

  void triggerEmergencySos() {
    _isSosActive = true;
    _sosCountdown = 10;
    notifyListeners();

    _sosTimer?.cancel();
    _sosTimer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (_sosCountdown > 1) {
        _sosCountdown--;
        notifyListeners();
      } else {
        _isSosActive = false;
        _sosCountdown = 10;
        timer.cancel();
        notifyListeners();
      }
    });
  }

  void cancelEmergencySos() {
    _sosTimer?.cancel();
    _isSosActive = false;
    _sosCountdown = 10;
    notifyListeners();
  }

  @override
  void dispose() {
    _sosTimer?.cancel();
    super.dispose();
  }
}
