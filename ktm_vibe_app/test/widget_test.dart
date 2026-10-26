import 'package:flutter_test/flutter_test.dart';
import 'package:ktm_vibe/main.dart';
import 'package:ktm_vibe/providers/app_state.dart';
import 'package:provider/provider.dart';

void main() {
  testWidgets('KTM Vibe basic app smoke test', (WidgetTester tester) async {
    await tester.pumpWidget(
      MultiProvider(
        providers: [
          ChangeNotifierProvider(create: (_) => AppStateProvider()),
        ],
        child: const KtmVibeApp(),
      ),
    );

    // Verify that KTM Vibe dashboard renders key UI elements
    expect(find.text('ACTIVE MACHINE'), findsOneWidget);
    expect(find.text('START NAVIGATION'), findsOneWidget);
    expect(find.text('RIDE HUD'), findsOneWidget);
    expect(find.text('ODOMETER'), findsOneWidget);
  });
}
