import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:url_launcher/url_launcher.dart';
import '../providers/app_state.dart';
import '../theme/ktm_theme.dart';

class NavigationScreen extends StatefulWidget {
  const NavigationScreen({super.key});

  @override
  State<NavigationScreen> createState() => _NavigationScreenState();
}

class _NavigationScreenState extends State<NavigationScreen> {
  bool _showTftDisplay = false;
  late final TextEditingController _destinationController;

  @override
  void initState() {
    super.initState();
    _destinationController = TextEditingController(text: 'OMR Service Rd, Chennai');
  }

  @override
  void dispose() {
    _destinationController.dispose();
    super.dispose();
  }

  Future<void> _launchRealGoogleMaps(String destination) async {
    final target = destination.trim().isEmpty ? 'OMR Service Rd, Chennai' : destination.trim();
    final googleNavUri = Uri.parse('google.navigation:q=${Uri.encodeComponent(target)}&mode=d');
    final webUri = Uri.parse('https://www.google.com/maps/dir/?api=1&destination=${Uri.encodeComponent(target)}&travelmode=two_wheeler');

    try {
      if (await canLaunchUrl(googleNavUri)) {
        await launchUrl(googleNavUri, mode: LaunchMode.externalApplication);
      } else {
        await launchUrl(webUri, mode: LaunchMode.externalApplication);
      }
    } catch (_) {
      await launchUrl(webUri, mode: LaunchMode.externalApplication);
    }
  }

  @override
  Widget build(BuildContext context) {
    final state = context.watch<AppStateProvider>();

    return Scaffold(
      appBar: AppBar(
        title: Text(_showTftDisplay ? 'FACTORY TFT MIRROR' : 'NAVIGATION (GOOGLE MAPS)'),
        actions: [
          IconButton(
            tooltip: _showTftDisplay ? 'Switch to Navigation' : 'Switch to TFT Mirror',
            icon: Icon(_showTftDisplay ? Icons.navigation : Icons.speed, color: KtmTheme.orange),
            onPressed: () => setState(() => _showTftDisplay = !_showTftDisplay),
          ),
        ],
      ),
      body: _showTftDisplay ? _buildTftDisplayView(state) : _buildGoogleMapsView(state),
    );
  }

  // Real Google Maps + Notification Relay Screen
  Widget _buildGoogleMapsView(AppStateProvider state) {
    final activeBike = state.activeBike;

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // Destination search input
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 4),
            decoration: BoxDecoration(
              color: const Color(0xFF14161C),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: Colors.white12),
            ),
            child: Row(
              children: [
                const Icon(Icons.search, color: KtmTheme.orange, size: 20),
                const SizedBox(width: 10),
                Expanded(
                  child: TextField(
                    controller: _destinationController,
                    style: const TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.w600),
                    decoration: const InputDecoration(
                      hintText: 'Search destination (e.g. OMR Service Rd)',
                      hintStyle: TextStyle(color: Colors.white38, fontSize: 13),
                      border: InputBorder.none,
                    ),
                  ),
                ),
                const Icon(Icons.mic, color: Colors.white54, size: 20),
              ],
            ),
          ),
          const SizedBox(height: 10),

          // Quick Destination Chips
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              children: [
                'OMR Service Rd, Chennai',
                'ECR Beach Highway',
                'KTM Service Centre, Guindy',
                'Home',
              ].map((place) {
                return Padding(
                  padding: const EdgeInsets.only(right: 8),
                  child: ActionChip(
                    backgroundColor: const Color(0xFF14161C),
                    side: const BorderSide(color: Colors.white12),
                    label: Text(
                      '📍 ${place.split(',')[0]}',
                      style: const TextStyle(fontSize: 11, color: Colors.white70),
                    ),
                    onPressed: () {
                      _destinationController.text = place;
                      _launchRealGoogleMaps(place);
                    },
                  ),
                );
              }).toList(),
            ),
          ),
          const SizedBox(height: 16),

          // Big Glowing "Launch Real Google Maps Navigation" Button
          SizedBox(
            height: 54,
            child: ElevatedButton.icon(
              onPressed: () => _launchRealGoogleMaps(_destinationController.text),
              icon: const Icon(Icons.navigation, color: Colors.white, size: 22),
              label: const Text(
                'Start Real Google Maps Navigation',
                style: TextStyle(fontSize: 14, fontWeight: FontWeight.w900, color: Colors.white),
              ),
              style: ElevatedButton.styleFrom(
                backgroundColor: KtmTheme.orange,
                elevation: 6,
                shadowColor: const Color(0x99FF6600),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              ),
            ),
          ),
          const SizedBox(height: 20),

          // Google Maps Notification Relay Hub
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: const Color(0xFF12141A),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: const Color(0x4DFF6600)),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      children: [
                        Container(
                          width: 8,
                          height: 8,
                          decoration: const BoxDecoration(
                            color: KtmTheme.success,
                            shape: BoxShape.circle,
                            boxShadow: [BoxShadow(color: KtmTheme.success, blurRadius: 6)],
                          ),
                        ),
                        const SizedBox(width: 8),
                        const Text(
                          'NOTIFICATION RELAY: ACTIVE',
                          style: TextStyle(fontSize: 11, fontWeight: FontWeight.w800, color: KtmTheme.success),
                        ),
                      ],
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                      decoration: BoxDecoration(
                        color: const Color(0xFF1A1D24),
                        borderRadius: BorderRadius.circular(4),
                      ),
                      child: const Text('BLE 0x1800', style: TextStyle(fontSize: 9, color: Colors.white60)),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                Text(
                  'Background listener automatically intercepts turn notifications from Google Maps and transmits direction arrows & distance directly to your ${activeBike.model} speedometer.',
                  style: const TextStyle(fontSize: 11, color: KtmTheme.textSecondary, height: 1.4),
                ),
                const SizedBox(height: 14),

                // Intercepted Turn Card
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: const Color(0xFF090A0D),
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: Colors.white10),
                  ),
                  child: Row(
                    children: [
                      Container(
                        width: 44,
                        height: 44,
                        decoration: BoxDecoration(
                          color: const Color(0xFF4285F4),
                          shape: BoxShape.circle,
                          boxShadow: const [BoxShadow(color: Color(0x664285F4), blurRadius: 10)],
                        ),
                        child: const Icon(Icons.turn_right, color: Colors.white, size: 26),
                      ),
                      const SizedBox(width: 12),
                      const Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Turn right in 2.0 km',
                              style: TextStyle(fontSize: 14, fontWeight: FontWeight.w900, color: Colors.white),
                            ),
                            SizedBox(height: 2),
                            Text(
                              'OMR Service Rd • 12 min left',
                              style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: KtmTheme.success),
                            ),
                            SizedBox(height: 2),
                            Text(
                              'Intercepted from Google Maps -> Relayed via BLE',
                              style: TextStyle(fontSize: 9, color: Colors.white38),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 14),

                // Switch to TFT Mirror Button
                SizedBox(
                  width: double.infinity,
                  height: 46,
                  child: OutlinedButton.icon(
                    onPressed: () => setState(() => _showTftDisplay = true),
                    icon: const Icon(Icons.speed, color: Colors.white, size: 18),
                    label: const Text(
                      'Check Bike Speedometer Display Mirror',
                      style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 12),
                    ),
                    style: OutlinedButton.styleFrom(
                      side: const BorderSide(color: Colors.white24),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  // Poster Screen 7: TFT Display (Example)
  Widget _buildTftDisplayView(AppStateProvider state) {
    return Center(
      child: Container(
        width: double.infinity,
        margin: const EdgeInsets.all(20),
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: const Color(0xFF06070A),
          borderRadius: BorderRadius.circular(24),
          border: Border.all(color: const Color(0xFF2A2E38), width: 3),
          boxShadow: const [
            BoxShadow(
              color: Color(0x4DFF6600),
              blurRadius: 30,
              offset: Offset(0, 8),
            ),
          ],
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            // Top Turn Box
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Container(
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    color: const Color(0x334285F4),
                    borderRadius: BorderRadius.circular(8),
                    border: Border.all(color: const Color(0xFF4285F4)),
                  ),
                  child: const Icon(Icons.turn_right, color: Color(0xFF4285F4), size: 24),
                ),
                const Column(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    Text(
                      'Turn Right',
                      style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: Colors.white),
                    ),
                    Text(
                      '2.0 km',
                      style: TextStyle(fontSize: 16, fontWeight: FontWeight.w900, color: KtmTheme.success),
                    ),
                    Text(
                      'OMR Service Rd',
                      style: TextStyle(fontSize: 11, color: Colors.white60),
                    ),
                  ],
                ),
              ],
            ),
            const SizedBox(height: 24),

            // Giant Speed & Gear
            const Text(
              '48',
              style: TextStyle(
                fontSize: 80,
                fontWeight: FontWeight.w900,
                color: Colors.white,
                height: 1,
              ),
            ),
            const Text(
              'km/h',
              style: TextStyle(fontSize: 14, fontWeight: FontWeight.w800, color: KtmTheme.orange, letterSpacing: 1),
            ),
            const SizedBox(height: 8),

            Container(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
              decoration: BoxDecoration(
                color: KtmTheme.success,
                borderRadius: BorderRadius.circular(4),
              ),
              child: const Text(
                '4',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.w900, color: Colors.black),
              ),
            ),
            const SizedBox(height: 20),

            // KTM logo at bottom of cluster
            const Text(
              'KTM',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.w900,
                fontStyle: FontStyle.italic,
                color: KtmTheme.orange,
                letterSpacing: 2,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
