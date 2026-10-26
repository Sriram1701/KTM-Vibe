import 'package:flutter_test/flutter_test.dart';
import 'package:ktm_vibe/main.dart';
import 'package:ktm_vibe/providers/app_state.dart';
import 'package:provider/provider.dart';

void main() {
  testWidgets('KTM Vibe poster matching app smoke test', (WidgetTester tester) async {
    await tester.pumpWidget(
      MultiProvider(
        providers: [
          ChangeNotifierProvider(create: (_) => AppStateProvider()),
        ],
        child: const KtmVibeApp(),
      ),
    );

    // Verify key UI elements matching the reference poster
    expect(find.text('Duke 160 (2025)'), findsOneWidget);
    expect(find.text('Bluetooth Connected'), findsOneWidget);
    expect(find.text('TFT Support: Available'), findsOneWidget);
    expect(find.text('Start Navigation'), findsOneWidget);
  });
}
