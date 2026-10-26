import 'package:flutter/material.dart';

class KtmTheme {
  static const Color orange = Color(0xFFFF6600);
  static const Color orangeBright = Color(0xFFFF7700);
  static const Color orangeGlow = Color(0x66FF6600);
  static const Color orangeSubtle = Color(0x22FF6600);

  static const Color background = Color(0xFF0A0B0E);
  static const Color card = Color(0xFF14161C);
  static const Color cardElevated = Color(0xFF1A1D24);
  static const Color border = Color(0x1FFFFFFF);
  static const Color borderOrange = Color(0x66FF6600);

  static const Color textPrimary = Color(0xFFFFFFFF);
  static const Color textSecondary = Color(0xFF8E95A5);
  static const Color textMuted = Color(0xFF555D6E);

  static const Color success = Color(0xFF00E676);
  static const Color warning = Color(0xFFFFB300);
  static const Color danger = Color(0xFFFF3B30);

  static ThemeData get darkTheme {
    return ThemeData(
      brightness: Brightness.dark,
      scaffoldBackgroundColor: background,
      primaryColor: orange,
      colorScheme: const ColorScheme.dark(
        primary: orange,
        secondary: orangeBright,
        surface: card,
        error: danger,
      ),
      cardTheme: CardThemeData(
        color: card,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(14),
          side: const BorderSide(color: border, width: 1),
        ),
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: background,
        elevation: 0,
        centerTitle: false,
        titleTextStyle: TextStyle(
          color: textPrimary,
          fontSize: 18,
          fontWeight: FontWeight.w800,
          letterSpacing: 1.2,
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: orange,
          foregroundColor: Colors.white,
          elevation: 0,
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 14),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10),
          ),
          textStyle: const TextStyle(
            fontWeight: FontWeight.w800,
            letterSpacing: 0.8,
          ),
        ),
      ),
    );
  }
}
