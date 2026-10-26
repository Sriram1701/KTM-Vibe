import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'providers/app_state.dart';
import 'screens/onboarding_flow_screens.dart';
import 'theme/ktm_theme.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AppStateProvider()),
      ],
      child: const KtmVibeApp(),
    ),
  );
}

class KtmVibeApp extends StatelessWidget {
  const KtmVibeApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'KTM Vibe',
      debugShowCheckedModeBanner: false,
      theme: KtmTheme.darkTheme,
      home: const SplashScreen(),
    );
  }
}
