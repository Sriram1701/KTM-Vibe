import 'package:flutter/material.dart';
import '../theme/ktm_theme.dart';
import 'dashboard_screen.dart';
import 'navigation_screen.dart';
import 'garage_screen.dart';
import 'bluetooth_screen.dart';
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
      const BluetoothScreen(),
      const UtilitiesScreen(),
    ];

    return Scaffold(
      body: IndexedStack(
        index: _currentIndex,
        children: screens,
      ),
      bottomNavigationBar: Container(
        decoration: const BoxDecoration(
          color: Color(0xFF0A0B0E),
          border: Border(top: BorderSide(color: Colors.white10, width: 1)),
        ),
        child: BottomNavigationBar(
          currentIndex: _currentIndex,
          onTap: _onTabSelected,
          backgroundColor: Colors.transparent,
          selectedItemColor: KtmTheme.orange,
          unselectedItemColor: KtmTheme.textMuted,
          type: BottomNavigationBarType.fixed,
          selectedFontSize: 11,
          unselectedFontSize: 10,
          items: const [
            BottomNavigationBarItem(
              icon: Icon(Icons.speed),
              label: 'Dashboard',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.navigation),
              label: 'Navigation',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.two_wheeler),
              label: 'Garage',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.bluetooth),
              label: 'Bluetooth',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.menu),
              label: 'Utilities',
            ),
          ],
        ),
      ),
    );
  }
}
