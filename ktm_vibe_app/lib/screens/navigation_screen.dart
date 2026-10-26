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
  bool _showTftDisplay = false;

  @override
  Widget build(BuildContext context) {
    final state = context.watch<AppStateProvider>();

    return Scaffold(
      appBar: AppBar(
        title: Text(_showTftDisplay ? 'TFT DISPLAY (EXAMPLE)' : 'NAVIGATION (GOOGLE MAPS)'),
        actions: [
          IconButton(
            tooltip: _showTftDisplay ? 'Switch to Map' : 'Switch to TFT Mirror',
            icon: Icon(_showTftDisplay ? Icons.map : Icons.dashboard, color: KtmTheme.orange),
            onPressed: () => setState(() => _showTftDisplay = !_showTftDisplay),
          ),
        ],
      ),
      body: _showTftDisplay ? _buildTftDisplayView(state) : _buildGoogleMapsView(state),
    );
  }

  // Poster Screen 6: Navigation (Google Maps)
  Widget _buildGoogleMapsView(AppStateProvider state) {
    return Column(
      children: [
        // Search bar
        Container(
          margin: const EdgeInsets.all(14),
          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
          decoration: BoxDecoration(
            color: const Color(0xFF14161C),
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: Colors.white12),
          ),
          child: const Row(
            children: [
              Icon(Icons.search, color: Colors.white60, size: 20),
              SizedBox(width: 10),
              Expanded(
                child: Text(
                  'Search here',
                  style: TextStyle(fontSize: 14, color: Colors.white54),
                ),
              ),
              Icon(Icons.mic, color: Colors.white60, size: 20),
            ],
          ),
        ),

        // Simulated Dark Map
        Expanded(
          child: Container(
            width: double.infinity,
            margin: const EdgeInsets.symmetric(horizontal: 14),
            decoration: BoxDecoration(
              color: const Color(0xFF151922),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: Colors.white10),
            ),
            child: Stack(
              children: [
                // Map polyline
                CustomPaint(
                  size: Size.infinite,
                  painter: _MapRoutePainter(),
                ),
                const Positioned(
                  bottom: 12,
                  left: 14,
                  child: Text(
                    'Google',
                    style: TextStyle(fontSize: 12, fontWeight: FontWeight.w800, color: Colors.white38),
                  ),
                ),
              ],
            ),
          ),
        ),

        // Bottom Turn-by-Turn Card
        Container(
          margin: const EdgeInsets.all(14),
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: const Color(0xFF101217),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: KtmTheme.borderOrange, width: 1.5),
            boxShadow: const [
              BoxShadow(
                color: Color(0x33FF6600),
                blurRadius: 15,
                offset: Offset(0, 4),
              ),
            ],
          ),
          child: Column(
            children: [
              Row(
                children: [
                  Container(
                    width: 48,
                    height: 48,
                    decoration: BoxDecoration(
                      color: const Color(0xFF4285F4),
                      borderRadius: BorderRadius.circular(50),
                    ),
                    child: const Icon(Icons.turn_right, color: Colors.white, size: 30),
                  ),
                  const SizedBox(width: 14),
                  const Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Turn right',
                          style: TextStyle(fontSize: 16, fontWeight: FontWeight.w900, color: Colors.white),
                        ),
                        SizedBox(height: 2),
                        Text(
                          '2.0 km • OMR Service Rd',
                          style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: KtmTheme.success),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              const Divider(color: Colors.white12, height: 24),
              const Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    '12 min • 5.8 km • 10:22 AM',
                    style: TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: Colors.white70),
                  ),
                  Text(
                    'Google Maps Live',
                    style: TextStyle(fontSize: 11, color: Color(0xFF4285F4), fontWeight: FontWeight.w700),
                  ),
                ],
              ),
            ],
          ),
        ),
      ],
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

class _MapRoutePainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = const Color(0xFF4285F4)
      ..strokeWidth = 6
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;

    final path = Path()
      ..moveTo(size.width * 0.3, size.height * 0.8)
      ..lineTo(size.width * 0.45, size.height * 0.5)
      ..lineTo(size.width * 0.7, size.height * 0.35)
      ..lineTo(size.width * 0.7, size.height * 0.1);

    canvas.drawPath(path, paint);

    // Start point
    final startPaint = Paint()..color = const Color(0xFFFF6600);
    canvas.drawCircle(Offset(size.width * 0.3, size.height * 0.8), 8, startPaint);

    // End point
    final endPaint = Paint()..color = const Color(0xFFFF3B30);
    canvas.drawCircle(Offset(size.width * 0.7, size.height * 0.1), 7, endPaint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
