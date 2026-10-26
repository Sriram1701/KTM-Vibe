import 'dart:async';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/app_models.dart';
import '../providers/app_state.dart';
import '../theme/ktm_theme.dart';
import 'main_shell.dart';

// 1. SPLASH SCREEN
class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  Timer? _timer;

  @override
  void initState() {
    super.initState();
    _timer = Timer(const Duration(seconds: 3), () {
      if (mounted) {
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (_) => const OnboardingIntroScreen()),
        );
      }
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF090A0D),
      body: SafeArea(
        child: Center(
          child: Padding(
            padding: const EdgeInsets.all(24),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                RichText(
                  text: const TextSpan(
                    children: [
                      TextSpan(
                        text: 'KTM ',
                        style: TextStyle(
                          fontSize: 36,
                          fontWeight: FontWeight.w900,
                          fontStyle: FontStyle.italic,
                          color: KtmTheme.orange,
                          letterSpacing: 2,
                        ),
                      ),
                      TextSpan(
                        text: 'Vibe',
                        style: TextStyle(
                          fontSize: 36,
                          fontWeight: FontWeight.w700,
                          fontStyle: FontStyle.italic,
                          color: Color(0xFFFF8800),
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 4),
                const Text(
                  'CONNECT • RIDE • EXPLORE',
                  style: TextStyle(fontSize: 11, letterSpacing: 2, color: KtmTheme.textSecondary),
                ),
                const SizedBox(height: 24),

                Container(
                  height: 220,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(20),
                    boxShadow: const [
                      BoxShadow(color: Color(0x33FF6600), blurRadius: 25, offset: Offset(0, 8)),
                    ],
                  ),
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(20),
                    child: Image.asset('assets/images/ktm_duke_hero.jpg', fit: BoxFit.cover),
                  ),
                ),
                const SizedBox(height: 30),

                const LinearProgressIndicator(
                  color: KtmTheme.orange,
                  backgroundColor: Color(0xFF1E222B),
                ),
                const SizedBox(height: 12),
                const Text(
                  'Loading your ride experience...',
                  style: TextStyle(fontSize: 12, color: Colors.white60),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

// 12. ONBOARDING INTRO SCREEN
class OnboardingIntroScreen extends StatelessWidget {
  const OnboardingIntroScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        fit: StackFit.expand,
        children: [
          Image.asset('assets/images/ktm_riding_highway.jpg', fit: BoxFit.cover),
          Container(
            decoration: const BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [
                  Color(0x99090A0D),
                  Color(0x33090A0D),
                  Color(0xF2090A0D),
                ],
              ),
            ),
          ),
          SafeArea(
            child: Padding(
              padding: const EdgeInsets.all(24),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  RichText(
                    text: const TextSpan(
                      children: [
                        TextSpan(
                          text: 'KTM ',
                          style: TextStyle(
                            fontSize: 28,
                            fontWeight: FontWeight.w900,
                            fontStyle: FontStyle.italic,
                            color: KtmTheme.orange,
                          ),
                        ),
                        TextSpan(
                          text: 'Vibe',
                          style: TextStyle(
                            fontSize: 28,
                            fontWeight: FontWeight.w700,
                            fontStyle: FontStyle.italic,
                            color: Color(0xFFFF8800),
                          ),
                        ),
                      ],
                    ),
                  ),
                  Column(
                    children: [
                      const Text(
                        'Smart Navigation\nfor Your KTM',
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          fontSize: 26,
                          fontWeight: FontWeight.w900,
                          color: Colors.white,
                          height: 1.2,
                        ),
                      ),
                      const SizedBox(height: 10),
                      const Text(
                        'Connect your bike, get turn-by-turn navigation on your TFT and ride smarter.',
                        textAlign: TextAlign.center,
                        style: TextStyle(fontSize: 13, color: Colors.white70),
                      ),
                      const SizedBox(height: 24),

                      SizedBox(
                        width: double.infinity,
                        height: 52,
                        child: ElevatedButton(
                          onPressed: () {
                            Navigator.pushReplacement(
                              context,
                              MaterialPageRoute(builder: (_) => const LoginScreen()),
                            );
                          },
                          child: const Text('Get Started'),
                        ),
                      ),
                      const SizedBox(height: 10),
                      TextButton(
                        onPressed: () {
                          Navigator.pushReplacement(
                            context,
                            MaterialPageRoute(builder: (_) => const MainShell()),
                          );
                        },
                        child: const Text('Skip', style: TextStyle(color: Colors.white60)),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

// 2. GOOGLE LOGIN SCREEN
class LoginScreen extends StatelessWidget {
  const LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF090A0D),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              RichText(
                text: const TextSpan(
                  children: [
                    TextSpan(
                      text: 'KTM ',
                      style: TextStyle(
                        fontSize: 32,
                        fontWeight: FontWeight.w900,
                        fontStyle: FontStyle.italic,
                        color: KtmTheme.orange,
                      ),
                    ),
                    TextSpan(
                      text: 'Vibe',
                      style: TextStyle(
                        fontSize: 32,
                        fontWeight: FontWeight.w700,
                        fontStyle: FontStyle.italic,
                        color: Color(0xFFFF8800),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),
              const Text(
                'Sign in with Google\nto continue',
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: Colors.white),
              ),
              const SizedBox(height: 32),

              SizedBox(
                width: double.infinity,
                height: 50,
                child: ElevatedButton.icon(
                  onPressed: () {
                    Navigator.pushReplacement(
                      context,
                      MaterialPageRoute(builder: (_) => const SelectBikeScreen()),
                    );
                  },
                  icon: const Icon(Icons.g_mobiledata, color: Colors.blue, size: 30),
                  label: const Text('Continue with Google', style: TextStyle(color: Colors.black)),
                  style: ElevatedButton.styleFrom(backgroundColor: Colors.white),
                ),
              ),
              const SizedBox(height: 12),

              TextButton(
                onPressed: () {
                  Navigator.pushReplacement(
                    context,
                    MaterialPageRoute(builder: (_) => const SelectBikeScreen()),
                  );
                },
                child: const Text('Continue as Guest Rider', style: TextStyle(color: KtmTheme.orange)),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// 3. SELECT YOUR BIKE SCREEN
class SelectBikeScreen extends StatefulWidget {
  const SelectBikeScreen({super.key});

  @override
  State<SelectBikeScreen> createState() => _SelectBikeScreenState();
}

class _SelectBikeScreenState extends State<SelectBikeScreen> {
  String _selectedModel = 'Duke 160';
  final String _selectedYear = '2025';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('SELECT YOUR BIKE')),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Choose your KTM bike details',
              style: TextStyle(fontSize: 12, color: KtmTheme.textSecondary),
            ),
            const SizedBox(height: 16),

            Expanded(
              child: GridView.count(
                crossAxisCount: 2,
                crossAxisSpacing: 12,
                mainAxisSpacing: 12,
                children: ['Duke 160', 'Duke 200', 'Duke 250', 'Duke 390'].map((model) {
                  final isSelected = _selectedModel == model;
                  return InkWell(
                    onTap: () => setState(() => _selectedModel = model),
                    borderRadius: BorderRadius.circular(14),
                    child: Container(
                      decoration: BoxDecoration(
                        color: isSelected ? const Color(0x1FFF6600) : KtmTheme.card,
                        border: Border.all(
                          color: isSelected ? KtmTheme.orange : Colors.white12,
                          width: isSelected ? 2 : 1,
                        ),
                        borderRadius: BorderRadius.circular(14),
                      ),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const Icon(Icons.two_wheeler, color: KtmTheme.orange, size: 40),
                          const SizedBox(height: 8),
                          Text(
                            model,
                            style: const TextStyle(fontWeight: FontWeight.w800, color: Colors.white),
                          ),
                        ],
                      ),
                    ),
                  );
                }).toList(),
              ),
            ),

            SizedBox(
              width: double.infinity,
              height: 52,
              child: ElevatedButton(
                onPressed: () {
                  final state = context.read<AppStateProvider>();
                  state.setActiveBike(
                    BikeProfile(
                      id: 'bike-user',
                      model: 'KTM $_selectedModel',
                      year: _selectedYear,
                      nickname: 'My $_selectedModel',
                      odometer: 14280,
                      fuelLevel: 80,
                      batteryVoltage: 12.8,
                      tftStatus: 'Compatible (TFT)',
                      tftVerified: true,
                      deviceName: 'KTM_${_selectedModel.replaceAll(' ', '_').toUpperCase()}',
                    ),
                  );
                  Navigator.pushReplacement(
                    context,
                    MaterialPageRoute(builder: (_) => const BluetoothSetupScreen()),
                  );
                },
                child: const Text('Next'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// 4. BLUETOOTH SETUP SCREEN
class BluetoothSetupScreen extends StatefulWidget {
  const BluetoothSetupScreen({super.key});

  @override
  State<BluetoothSetupScreen> createState() => _BluetoothSetupScreenState();
}

class _BluetoothSetupScreenState extends State<BluetoothSetupScreen> {
  bool _isConnecting = false;

  @override
  Widget build(BuildContext context) {
    final state = context.watch<AppStateProvider>();

    return Scaffold(
      appBar: AppBar(title: const Text('BLUETOOTH SETUP')),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            const Icon(Icons.bluetooth_searching, size: 70, color: KtmTheme.orange),
            const SizedBox(height: 12),
            const Text(
              'Pair your bike with the app',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.w800, color: Colors.white),
            ),
            const SizedBox(height: 24),

            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: KtmTheme.card,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: KtmTheme.orange),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        state.activeBike.deviceName,
                        style: const TextStyle(fontWeight: FontWeight.w800, color: Colors.white),
                      ),
                      const Text(
                        'Available to Pair',
                        style: TextStyle(fontSize: 11, color: KtmTheme.success),
                      ),
                    ],
                  ),
                  ElevatedButton(
                    onPressed: _isConnecting
                        ? null
                        : () async {
                            setState(() => _isConnecting = true);
                            await Future.delayed(const Duration(seconds: 1));
                            if (!context.mounted) return;
                            Navigator.pushReplacement(
                              context,
                              MaterialPageRoute(builder: (_) => const MainShell()),
                            );
                          },
                    child: Text(_isConnecting ? 'Connecting...' : 'Connect'),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
