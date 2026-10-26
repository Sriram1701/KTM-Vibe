import 'package:flutter/material.dart';
import '../theme/ktm_theme.dart';
import 'dashboard_screen.dart';
import 'navigation_screen.dart';
import 'garage_screen.dart';
import 'settings_screen.dart';
import 'utilities_screen.dart';

class MainShell extends StatefulWidget {
  const MainShell({super.key});

  @override
  State<MainShell> createState() => _MainShellState();
}

class _MainShellState extends State<MainShell> {
  int _currentIndex = 0;

  void _onTabSelected(int index) {
    setState(() {
      _currentIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    final screens = [
      DashboardScreen(onNavigateToTab: _onTabSelected),
      const NavigationScreen(),
      const GarageScreen(),
      const SettingsScreen(),
      const UtilitiesScreen(),
    ];

    return Scaffold(
      body: IndexedStack(
        index: _currentIndex,
        children: screens,
      ),
      bottomNavigationBar: Container(
        decoration: const BoxDecoration(
          color: Color(0xFF090A0D),
          border: Border(top: BorderSide(color: Colors.white10, width: 1)),
        ),
        child: BottomNavigationBar(
          currentIndex: _currentIndex,
          onTap: _onTabSelected,
          backgroundColor: Colors.transparent,
          selectedItemColor: KtmTheme.orange,
          unselectedItemColor: Colors.white38,
          type: BottomNavigationBarType.fixed,
          selectedFontSize: 11,
          unselectedFontSize: 11,
          selectedLabelStyle: const TextStyle(fontWeight: FontWeight.w800),
          unselectedLabelStyle: const TextStyle(fontWeight: FontWeight.w600),
          items: const [
            BottomNavigationBarItem(
              icon: Icon(Icons.two_wheeler),
              label: 'My Bikes',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.navigation),
              label: 'Navigation',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.garage),
              label: 'Garage',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.settings),
              label: 'Settings',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.help_outline),
              label: 'Help',
            ),
          ],
        ),
      ),
    );
  }
}
