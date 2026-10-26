import 'package:flutter/material.dart';
import '../theme/ktm_theme.dart';

class SettingsScreen extends StatelessWidget {
  const SettingsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('SETTINGS & SYSTEM'),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          _sectionHeader('PREFERENCES'),
          _tile(Icons.speed, 'Speedometer Units', 'km/h (Metric)', null),
          _tile(Icons.dark_mode, 'High-Contrast AMOLED', 'Active', null),
          _tile(Icons.bluetooth_searching, 'Background BLE Sync', 'Enabled', null),

          const SizedBox(height: 16),
          _sectionHeader('HELP & TFT HARDWARE'),
          _tile(
            Icons.help_outline,
            'Duke 160 TFT Compatibility',
            'Simulated Mode Notice',
            () => _showDialog(
              context,
              'Duke 160 TFT Compatibility',
              'Per KTM Vibe Master Plan Section 5:\n\nFactory LCD displays on Duke 160/200 do not support third-party turn-by-turn navigation packet protocols.\n\nKTM Vibe guarantees safety by operating in Simulated Guidance Mode without attempting unsafe ECU writes.',
            ),
          ),
          _tile(
            Icons.link,
            'KTM MY RIDE Pairing Guide',
            'View Steps',
            () => _showDialog(
              context,
              'Pairing Steps',
              '1. On your KTM handlebar switch, navigate to SETTINGS > KTM MY RIDE.\n2. Choose PAIRING > PHONE.\n3. Verify the 6-digit Bluetooth PIN.\n4. Ensure Notification Access is enabled in Android Settings.',
            ),
          ),

          const SizedBox(height: 16),
          _sectionHeader('DATA PRIVACY & BACKUP'),
          _tile(
            Icons.file_download_outlined,
            'Export Telemetry (JSON)',
            'Download local ride logs',
            () => ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(content: Text('Exported: ktm_vibe_telemetry_2026.json')),
            ),
          ),
          _tile(
            Icons.delete_forever,
            'Delete Account & Cloud Data',
            'Play Store Compliance',
            () => ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(content: Text('Account deletion requested. Data purged within 24h.')),
            ),
          ),

          const SizedBox(height: 24),
          const Center(
            child: Text(
              'KTM Vibe • v1.0.0 (Build 1) • Ready to Race',
              style: TextStyle(fontSize: 11, color: KtmTheme.textMuted),
            ),
          ),
        ],
      ),
    );
  }

  Widget _sectionHeader(String title) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8, top: 4),
      child: Text(
        title,
        style: const TextStyle(
          fontSize: 11,
          fontWeight: FontWeight.w800,
          color: KtmTheme.orange,
          letterSpacing: 1.2,
        ),
      ),
    );
  }

  Widget _tile(IconData icon, String title, String subtitle, VoidCallback? onTap) {
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      child: Material(
        color: KtmTheme.card,
        borderRadius: BorderRadius.circular(10),
        child: ListTile(
          leading: Icon(icon, color: KtmTheme.orange, size: 20),
          title: Text(title, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: Colors.white)),
          subtitle: Text(subtitle, style: const TextStyle(fontSize: 11, color: KtmTheme.textSecondary)),
          trailing: const Icon(Icons.chevron_right, color: Colors.white30, size: 18),
          onTap: onTap,
        ),
      ),
    );
  }

  void _showDialog(BuildContext context, String title, String message) {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        backgroundColor: KtmTheme.cardElevated,
        title: Text(title, style: const TextStyle(color: Colors.white, fontSize: 16)),
        content: Text(message, style: const TextStyle(color: Colors.white70, fontSize: 13)),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text('OK', style: TextStyle(color: KtmTheme.orange)),
          ),
        ],
      ),
    );
  }
}
