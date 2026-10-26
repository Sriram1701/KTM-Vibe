import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_state.dart';
import '../theme/ktm_theme.dart';

class NavigationScreen extends StatefulWidget {
  const NavigationScreen({super.key});

  @override
  State<NavigationScreen> createState() => _NavigationScreenState();
}

class _NavigationScreenState extends State<NavigationScreen> {
  bool _isHudMode = false;

  @override
  Widget build(BuildContext context) {
    final state = context.watch<AppStateProvider>();
    final nav = state.navStep;

    if (_isHudMode) {
      return _buildTrackHudMode(state);
    }

    return Scaffold(
      appBar: AppBar(
        title: const Text('NAVIGATION COMPANION'),
        actions: [
          IconButton(
            tooltip: 'Simulate Next Turn',
            icon: const Icon(Icons.skip_next, color: KtmTheme.orange),
            onPressed: () => state.nextNavTurn(),
          ),
          IconButton(
            tooltip: 'Switch to Track HUD',
            icon: const Icon(Icons.fullscreen, color: Colors.white),
            onPressed: () => setState(() => _isHudMode = true),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            // Status Header
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color: const Color(0x2600E676),
                    borderRadius: BorderRadius.circular(6),
                    border: Border.all(color: KtmTheme.success),
                  ),
                  child: const Text(
                    'SIMULATED HUD ACTIVE',
                    style: TextStyle(
                      fontSize: 10,
                      fontWeight: FontWeight.w800,
                      color: KtmTheme.success,
                    ),
                  ),
                ),
                TextButton.icon(
                  onPressed: () => state.nextNavTurn(),
                  icon: const Icon(Icons.refresh, size: 14, color: KtmTheme.orange),
                  label: const Text('Next Maneuver', style: TextStyle(color: KtmTheme.orange, fontSize: 11)),
                ),
              ],
            ),
            const SizedBox(height: 12),

            // Factory TFT Mirror Display
            Container(
              width: double.infinity,
              padding: const EdgeInsets.symmetric(vertical: 24, horizontal: 16),
              decoration: BoxDecoration(
                color: const Color(0xFF060709),
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: KtmTheme.orange, width: 2),
                boxShadow: const [
                  BoxShadow(
                    color: Color(0x4DFF6600),
                    blurRadius: 25,
                    offset: Offset(0, 4),
                  ),
                ],
              ),
              child: Column(
                children: [
                  const Text(
                    'KTM FACTORY TFT MIRROR',
                    style: TextStyle(
                      fontSize: 10,
                      fontWeight: FontWeight.w700,
                      letterSpacing: 2,
                      color: Colors.white54,
                    ),
                  ),
                  const SizedBox(height: 16),

                  // Giant Turn Arrow Icon
                  const Icon(
                    Icons.turn_right_rounded,
                    size: 80,
                    color: KtmTheme.orange,
                  ),
                  const SizedBox(height: 10),

                  // Distance Countdown
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.baseline,
                    textBaseline: TextBaseline.alphabetic,
                    children: [
                      Text(
                        '${nav.distanceMeters}',
                        style: const TextStyle(
                          fontSize: 48,
                          fontWeight: FontWeight.w900,
                          color: Colors.white,
                          letterSpacing: 1,
                        ),
                      ),
                      const SizedBox(width: 4),
                      const Text(
                        'm',
                        style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.w900,
                          color: KtmTheme.orange,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),

                  Text(
                    nav.turnInstruction,
                    textAlign: TextAlign.center,
                    style: const TextStyle(
                      fontSize: 15,
                      fontWeight: FontWeight.w700,
                      color: Colors.white,
                    ),
                  ),
                  const SizedBox(height: 6),
                  Text(
                    'Via ${nav.roadName}',
                    style: const TextStyle(fontSize: 11, color: KtmTheme.textSecondary),
                  ),
                  const SizedBox(height: 12),
                  Text(
                    'Destination: ${nav.destination}',
                    style: const TextStyle(fontSize: 11, color: Colors.white70),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Google Maps Service Card
            Container(
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: KtmTheme.card,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: KtmTheme.border),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Row(
                    children: [
                      Icon(Icons.notifications_active, color: Color(0xFF4285F4), size: 16),
                      SizedBox(width: 8),
                      Text(
                        'Android Notification Listener',
                        style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: Colors.white),
                      ),
                    ],
                  ),
                  const SizedBox(height: 6),
                  const Text(
                    'Listening to Google Maps foreground turn prompts. Package: com.google.android.apps.maps',
                    style: TextStyle(fontSize: 10, color: KtmTheme.textSecondary),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Mode Switching Actions
            Row(
              children: [
                Expanded(
                  child: ElevatedButton.icon(
                    onPressed: () => setState(() => _isHudMode = true),
                    icon: const Icon(Icons.fullscreen, size: 18),
                    label: const Text('TRACK HUD MODE'),
                  ),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: OutlinedButton.icon(
                    onPressed: () => state.nextNavTurn(),
                    icon: const Icon(Icons.directions, size: 18, color: KtmTheme.orange),
                    label: const Text('TEST NEXT STEP'),
                    style: OutlinedButton.styleFrom(
                      foregroundColor: Colors.white,
                      side: const BorderSide(color: KtmTheme.border),
                      padding: const EdgeInsets.symmetric(vertical: 14),
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTrackHudMode(AppStateProvider state) {
    final nav = state.navStep;

    return Scaffold(
      backgroundColor: Colors.black,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              // Top Bar
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    decoration: BoxDecoration(
                      color: const Color(0x33FF6600),
                      borderRadius: BorderRadius.circular(4),
                    ),
                    child: const Text(
                      'TRACK HUD MODE',
                      style: TextStyle(fontSize: 11, fontWeight: FontWeight.w800, color: KtmTheme.orange),
                    ),
                  ),
                  const Text(
                    'GEAR 4',
                    style: TextStyle(fontSize: 14, fontWeight: FontWeight.w900, color: KtmTheme.success),
                  ),
                  IconButton(
                    icon: const Icon(Icons.close, color: Colors.white70),
                    onPressed: () => setState(() => _isHudMode = false),
                  ),
                ],
              ),

              // Giant Speedometer
              Column(
                children: [
                  Text(
                    '${state.currentNavSpeed}',
                    style: const TextStyle(
                      fontSize: 100,
                      fontWeight: FontWeight.w900,
                      color: Colors.white,
                      height: 1,
                      shadows: [
                        Shadow(color: Color(0x99FF6600), blurRadius: 30),
                      ],
                    ),
                  ),
                  const Text(
                    'KM / H',
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.w800,
                      letterSpacing: 4,
                      color: KtmTheme.orange,
                    ),
                  ),
                ],
              ),

              // Bottom Turn Strip
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: const Color(0xFF14161C),
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: KtmTheme.borderOrange),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.turn_right_rounded, size: 40, color: KtmTheme.orange),
                    const SizedBox(width: 14),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            '${nav.distanceMeters} m',
                            style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w900, color: Colors.white),
                          ),
                          Text(
                            nav.turnInstruction,
                            style: const TextStyle(fontSize: 11, color: Colors.white70),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
