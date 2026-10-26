import 'package:flutter_test/flutter_test.dart';
import 'package:ktm_vibe/main.dart';
import 'package:ktm_vibe/providers/app_state.dart';
import 'package:provider/provider.dart';

void main() {
  testWidgets('KTM Vibe app boot and flow smoke test', (WidgetTester tester) async {
    await tester.pumpWidget(
      MultiProvider(
        providers: [
          ChangeNotifierProvider(create: (_) => AppStateProvider()),
        ],
        child: const KtmVibeApp(),
      ),
    );

    // Verify initial splash boot elements
    expect(find.text('CONNECT • RIDE • EXPLORE'), findsOneWidget);
    expect(find.text('Loading your ride experience...'), findsOneWidget);

    // Advance timer past splash duration
    await tester.pump(const Duration(seconds: 4));
    await tester.pump();
  });
}
