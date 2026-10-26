import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_state.dart';
import '../theme/ktm_theme.dart';

class DashboardScreen extends StatelessWidget {
  final Function(int) onNavigateToTab;

  const DashboardScreen({super.key, required this.onNavigateToTab});

  @override
  Widget build(BuildContext context) {
    final state = context.watch<AppStateProvider>();
    final bike = state.activeBike;

    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(6),
              decoration: BoxDecoration(
                color: KtmTheme.orange,
                borderRadius: BorderRadius.circular(6),
              ),
              child: const Icon(Icons.flash_on, color: Colors.white, size: 16),
            ),
            const SizedBox(width: 10),
            RichText(
              text: const TextSpan(
                children: [
                  TextSpan(
                    text: 'KTM ',
                    style: TextStyle(
                      fontWeight: FontWeight.w900,
                      color: Colors.white,
                      fontSize: 18,
                      letterSpacing: 1.5,
                    ),
                  ),
                  TextSpan(
                    text: 'VIBE',
                    style: TextStyle(
                      fontWeight: FontWeight.w900,
                      color: KtmTheme.orange,
                      fontSize: 18,
                      letterSpacing: 1.5,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: Icon(
              Icons.bluetooth,
              color: state.isBluetoothConnected ? KtmTheme.orange : Colors.grey,
            ),
            onPressed: () => onNavigateToTab(3), // Bluetooth tab
          ),
          IconButton(
            icon: const Icon(Icons.notifications_none, color: Colors.white70),
            onPressed: () => onNavigateToTab(4), // Settings / Notifications
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Active Bike Banner
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'ACTIVE MACHINE',
                      style: TextStyle(
                        fontSize: 10,
                        fontWeight: FontWeight.w700,
                        color: KtmTheme.textSecondary,
                        letterSpacing: 1.2,
                      ),
                    ),
                    Text(
                      bike.model,
                      style: const TextStyle(
                        fontSize: 22,
                        fontWeight: FontWeight.w900,
                        color: Colors.white,
                      ),
                    ),
                  ],
                ),
                OutlinedButton(
                  onPressed: () => onNavigateToTab(2), // Garage tab
                  style: OutlinedButton.styleFrom(
                    foregroundColor: KtmTheme.orange,
                    side: const BorderSide(color: KtmTheme.borderOrange),
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                  ),
                  child: Text('GARAGE (${state.bikes.length})'),
                ),
              ],
            ),
            const SizedBox(height: 16),

            // Hero Bike Card
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [Color(0xFF1B1E26), Color(0xFF12141A)],
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                ),
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: KtmTheme.borderOrange, width: 1.2),
                boxShadow: const [
                  BoxShadow(
                    color: Color(0x33FF6600),
                    blurRadius: 20,
                    offset: Offset(0, 8),
                  ),
                ],
              ),
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(
                          color: state.isBluetoothConnected
                              ? const Color(0x2600E676)
                              : const Color(0x26FF6600),
                          borderRadius: BorderRadius.circular(6),
                          border: Border.all(
                            color: state.isBluetoothConnected
                                ? KtmTheme.success
                                : KtmTheme.orange,
                          ),
                        ),
                        child: Text(
                          state.isBluetoothConnected ? 'TFT LINKED' : 'OFFLINE',
                          style: TextStyle(
                            fontSize: 10,
                            fontWeight: FontWeight.w800,
                            color: state.isBluetoothConnected
                                ? KtmTheme.success
                                : KtmTheme.orange,
                          ),
                        ),
                      ),
                      Text(
                        '${bike.year} MODEL',
                        style: const TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.w700,
                          color: Colors.white54,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),

                  // Motorcycle Icon & Nickname
                  const Icon(
                    Icons.two_wheeler,
                    size: 80,
                    color: KtmTheme.orange,
                  ),
                  const SizedBox(height: 8),
                  Text(
                    '"${bike.nickname}"',
                    style: const TextStyle(
                      fontSize: 15,
                      fontWeight: FontWeight.w700,
                      color: Colors.white,
                    ),
                  ),
                  const SizedBox(height: 16),

                  // Telemetry metrics
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: Colors.black.withValues(alpha: 0.4),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: [
                        _metricItem('ODOMETER', '${bike.odometer.toString()} km', KtmTheme.orange),
                        _metricItem('RANGE', '240 km', KtmTheme.success),
                        _metricItem('BATTERY', '${bike.batteryVoltage} V', Colors.white),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Quick Actions: Start Navigation & Ride HUD
            Row(
              children: [
                Expanded(
                  child: ElevatedButton.icon(
                    onPressed: () => onNavigateToTab(1), // Nav tab
                    icon: const Icon(Icons.navigation, size: 18),
                    label: const Text('START NAVIGATION'),
                    style: ElevatedButton.styleFrom(
                      padding: const EdgeInsets.symmetric(vertical: 14),
                    ),
                  ),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: OutlinedButton.icon(
                    onPressed: () => onNavigateToTab(1),
                    icon: const Icon(Icons.speed, size: 18, color: KtmTheme.orange),
                    label: const Text('RIDE HUD'),
                    style: OutlinedButton.styleFrom(
                      foregroundColor: Colors.white,
                      side: const BorderSide(color: KtmTheme.border),
                      padding: const EdgeInsets.symmetric(vertical: 14),
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 14),

            // Maintenance Alert Strip
            InkWell(
              onTap: () => onNavigateToTab(4),
              borderRadius: BorderRadius.circular(10),
              child: Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: KtmTheme.card,
                  borderRadius: BorderRadius.circular(10),
                  border: const Border(
                    left: BorderSide(color: KtmTheme.orange, width: 4),
                  ),
                ),
                child: const Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Drive Chain Cleaning & Lube',
                          style: TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.w700,
                            color: Colors.white,
                          ),
                        ),
                        SizedBox(height: 2),
                        Text(
                          'Due in 220 km (O-ring inspection)',
                          style: TextStyle(fontSize: 10, color: KtmTheme.textSecondary),
                        ),
                      ],
                    ),
                    Icon(Icons.chevron_right, color: KtmTheme.orange, size: 20),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 12),

            // Emergency SOS Banner
            InkWell(
              onTap: () => state.triggerEmergencySos(),
              borderRadius: BorderRadius.circular(10),
              child: Container(
                width: double.infinity,
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: const Color(0x1AFF3B30),
                  borderRadius: BorderRadius.circular(10),
                  border: Border.all(color: const Color(0x4DFF3B30)),
                ),
                child: const Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(Icons.warning_amber_rounded, color: KtmTheme.danger, size: 16),
                    SizedBox(width: 8),
                    Text(
                      'EMERGENCY SOS READY (1 CONTACT SET)',
                      style: TextStyle(
                        fontSize: 11,
                        fontWeight: FontWeight.w800,
                        color: KtmTheme.danger,
                        letterSpacing: 0.5,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _metricItem(String label, String value, Color color) {
    return Column(
      children: [
        Text(
          label,
          style: const TextStyle(
            fontSize: 9,
            fontWeight: FontWeight.w700,
            color: KtmTheme.textSecondary,
          ),
        ),
        const SizedBox(height: 2),
        Text(
          value,
          style: TextStyle(
            fontSize: 13,
            fontWeight: FontWeight.w900,
            color: color,
          ),
        ),
      ],
    );
  }
}
