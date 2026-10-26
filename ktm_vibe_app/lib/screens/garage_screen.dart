import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/app_models.dart';
import '../providers/app_state.dart';
import '../theme/ktm_theme.dart';

class GarageScreen extends StatelessWidget {
  const GarageScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final state = context.watch<AppStateProvider>();

    return Scaffold(
      appBar: AppBar(
        title: const Text('MY BIKE GARAGE'),
        actions: [
          IconButton(
            icon: const Icon(Icons.add, color: KtmTheme.orange),
            onPressed: () => _showAddBikeDialog(context),
          ),
        ],
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: state.bikes.length,
        itemBuilder: (context, index) {
          final bike = state.bikes[index];
          final isSelected = bike.id == state.activeBike.id;

          return Container(
            margin: const EdgeInsets.only(bottom: 14),
            decoration: BoxDecoration(
              color: isSelected ? const Color(0x1FFF6600) : KtmTheme.card,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(
                color: isSelected ? KtmTheme.orange : KtmTheme.border,
                width: isSelected ? 1.5 : 1,
              ),
            ),
            child: InkWell(
              onTap: () => state.setActiveBike(bike),
              borderRadius: BorderRadius.circular(16),
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              bike.model,
                              style: const TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.w900,
                                color: Colors.white,
                              ),
                            ),
                            Text(
                              '"${bike.nickname}"',
                              style: const TextStyle(
                                fontSize: 12,
                                fontWeight: FontWeight.w700,
                                color: KtmTheme.orange,
                              ),
                            ),
                          ],
                        ),
                        if (isSelected)
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                            decoration: BoxDecoration(
                              color: KtmTheme.orange,
                              borderRadius: BorderRadius.circular(4),
                            ),
                            child: const Text(
                              'ACTIVE',
                              style: TextStyle(
                                fontSize: 9,
                                fontWeight: FontWeight.w900,
                                color: Colors.white,
                              ),
                            ),
                          )
                        else
                          const Text(
                            'Tap to Select',
                            style: TextStyle(fontSize: 11, color: KtmTheme.textSecondary),
                          ),
                      ],
                    ),
                    const SizedBox(height: 12),

                    Row(
                      children: [
                        Text(
                          'ODO: ${bike.odometer} km',
                          style: const TextStyle(fontSize: 12, color: Colors.white70),
                        ),
                        const SizedBox(width: 16),
                        Text(
                          'Fuel: ${bike.fuelLevel}%',
                          style: const TextStyle(fontSize: 12, color: Colors.white70),
                        ),
                        const SizedBox(width: 16),
                        Text(
                          'Battery: ${bike.batteryVoltage} V',
                          style: const TextStyle(fontSize: 12, color: Colors.white70),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),

                    Text(
                      bike.tftStatus,
                      style: TextStyle(
                        fontSize: 10,
                        fontWeight: FontWeight.w700,
                        color: bike.tftVerified ? KtmTheme.success : KtmTheme.warning,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }

  void _showAddBikeDialog(BuildContext context) {
    final modelController = TextEditingController();
    final nicknameController = TextEditingController();

    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        backgroundColor: KtmTheme.cardElevated,
        title: const Text('Add Bike to Garage', style: TextStyle(color: Colors.white)),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              controller: modelController,
              decoration: const InputDecoration(
                labelText: 'Model (e.g. KTM 390 Adventure)',
                labelStyle: TextStyle(color: Colors.white60),
              ),
              style: const TextStyle(color: Colors.white),
            ),
            const SizedBox(height: 8),
            TextField(
              controller: nicknameController,
              decoration: const InputDecoration(
                labelText: 'Nickname (e.g. Desert Fox)',
                labelStyle: TextStyle(color: Colors.white60),
              ),
              style: const TextStyle(color: Colors.white),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text('Cancel', style: TextStyle(color: Colors.white60)),
          ),
          ElevatedButton(
            onPressed: () {
              if (modelController.text.isNotEmpty) {
                final state = context.read<AppStateProvider>();
                state.addBike(
                  BikeProfile(
                    id: 'bike-${DateTime.now().millisecondsSinceEpoch}',
                    model: modelController.text,
                    year: '2025',
                    nickname: nicknameController.text.isNotEmpty ? nicknameController.text : 'My Ride',
                    odometer: 1200,
                    fuelLevel: 100,
                    batteryVoltage: 12.9,
                    tftStatus: 'Compatible (Verified TFT)',
                    tftVerified: true,
                    deviceName: 'KTM_BLE_${DateTime.now().second}',
                  ),
                );
                Navigator.pop(ctx);
              }
            },
            child: const Text('Add Machine'),
          ),
        ],
      ),
    );
  }
}
