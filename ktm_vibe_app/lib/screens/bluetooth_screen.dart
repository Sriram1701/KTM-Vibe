import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_state.dart';
import '../theme/ktm_theme.dart';

class BluetoothScreen extends StatelessWidget {
  const BluetoothScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final state = context.watch<AppStateProvider>();
    final bike = state.activeBike;

    return Scaffold(
      appBar: AppBar(
        title: const Text('BLUETOOTH & DIAGNOSTICS'),
        actions: [
          IconButton(
            icon: Icon(
              state.isBluetoothConnected ? Icons.bluetooth_connected : Icons.bluetooth_disabled,
              color: state.isBluetoothConnected ? KtmTheme.success : KtmTheme.warning,
            ),
            onPressed: () => state.toggleBluetooth(),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Status Card
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(18),
              decoration: BoxDecoration(
                color: KtmTheme.card,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(
                  color: state.isBluetoothConnected ? KtmTheme.borderOrange : KtmTheme.border,
                ),
              ),
              child: Column(
                children: [
                  Icon(
                    Icons.bluetooth,
                    size: 48,
                    color: state.isBluetoothConnected ? KtmTheme.success : KtmTheme.orange,
                  ),
                  const SizedBox(height: 10),
                  Text(
                    state.isBluetoothConnected ? 'CONNECTED' : 'DISCONNECTED',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w900,
                      color: state.isBluetoothConnected ? KtmTheme.success : KtmTheme.warning,
                      letterSpacing: 1.2,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    bike.deviceName,
                    style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: Colors.white70),
                  ),
                  const SizedBox(height: 14),

                  ElevatedButton(
                    onPressed: () => state.toggleBluetooth(),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: state.isBluetoothConnected ? KtmTheme.danger : KtmTheme.orange,
                    ),
                    child: Text(state.isBluetoothConnected ? 'DISCONNECT LINK' : 'CONNECT MACHINE'),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            const Text(
              'GATT TELEMETRY DIAGNOSTICS',
              style: TextStyle(
                fontSize: 11,
                fontWeight: FontWeight.w800,
                color: KtmTheme.textSecondary,
                letterSpacing: 1.2,
              ),
            ),
            const SizedBox(height: 10),

            _diagItem('Protocol State', state.isBluetoothConnected ? 'GATT_CONNECTED' : 'STANDBY', state.isBluetoothConnected ? KtmTheme.success : Colors.white60),
            _diagItem('Signal Strength (RSSI)', '-58 dBm (Strong)', Colors.white),
            _diagItem('TFT Firmware Handshake', 'v2.4.1 Verified', KtmTheme.success),
            _diagItem('Packets Transmitted', '2,410 frames (0% loss)', Colors.white),
            const SizedBox(height: 14),

            // Packet Stream Box
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: const Color(0xFF07080A),
                borderRadius: BorderRadius.circular(10),
                border: Border.all(color: Colors.white12),
              ),
              child: const Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'LIVE GATT LOG STREAM',
                    style: TextStyle(fontSize: 9, fontWeight: FontWeight.w800, color: Colors.white54),
                  ),
                  SizedBox(height: 6),
                  Text('[TX] 0x01 0x4B 0x54 0x4D_SYNC_ACK', style: TextStyle(fontFamily: 'monospace', fontSize: 10, color: KtmTheme.success)),
                  Text('[RX] 0x02 0xAA 0x12_TFT_HEARTBEAT', style: TextStyle(fontFamily: 'monospace', fontSize: 10, color: KtmTheme.success)),
                  Text('[TX] NAV_STEP: DIST=180M DIR=TURN_RIGHT', style: TextStyle(fontFamily: 'monospace', fontSize: 10, color: KtmTheme.orange)),
                  Text('[RX] 0x06 0x00_DISPLAY_UPDATED', style: TextStyle(fontFamily: 'monospace', fontSize: 10, color: KtmTheme.success)),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _diagItem(String label, String value, Color color) {
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
      decoration: BoxDecoration(
        color: KtmTheme.card,
        borderRadius: BorderRadius.circular(8),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: const TextStyle(fontSize: 12, color: KtmTheme.textSecondary)),
          Text(value, style: TextStyle(fontSize: 12, fontWeight: FontWeight.w800, color: color)),
        ],
      ),
    );
  }
}
