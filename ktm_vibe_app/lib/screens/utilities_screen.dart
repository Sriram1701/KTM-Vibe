import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_state.dart';
import '../theme/ktm_theme.dart';

class UtilitiesScreen extends StatefulWidget {
  const UtilitiesScreen({super.key});

  @override
  State<UtilitiesScreen> createState() => _UtilitiesScreenState();
}

class _UtilitiesScreenState extends State<UtilitiesScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 4, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final state = context.watch<AppStateProvider>();

    return Scaffold(
      appBar: AppBar(
        title: const Text('RIDER UTILITIES'),
        bottom: TabBar(
          controller: _tabController,
          indicatorColor: KtmTheme.orange,
          labelColor: KtmTheme.orange,
          unselectedLabelColor: KtmTheme.textSecondary,
          isScrollable: true,
          tabs: const [
            Tab(text: 'MAINTENANCE'),
            Tab(text: 'FUEL & MILEAGE'),
            Tab(text: 'RIDE LOGS'),
            Tab(text: 'EMERGENCY SOS'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          _buildMaintenanceTab(state),
          _buildFuelTab(state),
          _buildRideLogsTab(state),
          _buildSosTab(state),
        ],
      ),
    );
  }

  Widget _buildMaintenanceTab(AppStateProvider state) {
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: state.serviceReminders.length,
      itemBuilder: (context, index) {
        final item = state.serviceReminders[index];
        return Container(
          margin: const EdgeInsets.only(bottom: 12),
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            color: item.urgent ? const Color(0x1FFF3B30) : KtmTheme.card,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(
              color: item.urgent ? const Color(0x66FF3B30) : KtmTheme.border,
            ),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    item.title,
                    style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: Colors.white),
                  ),
                  Text(
                    item.status,
                    style: TextStyle(
                      fontSize: 10,
                      fontWeight: FontWeight.w800,
                      color: item.urgent ? KtmTheme.danger : KtmTheme.orange,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              LinearProgressIndicator(
                value: item.percentage,
                backgroundColor: Colors.white10,
                color: item.urgent ? KtmTheme.danger : KtmTheme.orange,
              ),
              const SizedBox(height: 10),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'Due at ${item.dueOdometer} km',
                    style: const TextStyle(fontSize: 11, color: KtmTheme.textSecondary),
                  ),
                  OutlinedButton(
                    onPressed: () => state.resetServiceReminder(item.id),
                    style: OutlinedButton.styleFrom(
                      foregroundColor: Colors.white,
                      side: const BorderSide(color: Colors.white24),
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    ),
                    child: const Text('Mark Done', style: TextStyle(fontSize: 11)),
                  ),
                ],
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildFuelTab(AppStateProvider state) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        children: [
          // Mileage Header Card
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(18),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [Color(0x33FF6600), Color(0xFF14161C)],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: KtmTheme.borderOrange),
            ),
            child: const Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'ESTIMATED ECONOMY',
                      style: TextStyle(fontSize: 10, fontWeight: FontWeight.w800, color: KtmTheme.textSecondary),
                    ),
                    SizedBox(height: 4),
                    Text(
                      '33.8 km/L',
                      style: TextStyle(fontSize: 28, fontWeight: FontWeight.w900, color: Colors.white),
                    ),
                  ],
                ),
                Icon(Icons.local_gas_station, size: 40, color: KtmTheme.orange),
              ],
            ),
          ),
          const SizedBox(height: 16),

          ...state.fuelEntries.map((e) => Container(
            margin: const EdgeInsets.only(bottom: 8),
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: KtmTheme.card,
              borderRadius: BorderRadius.circular(10),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('${e.litres} Litres • ₹${e.cost}', style: const TextStyle(fontWeight: FontWeight.w700, color: Colors.white)),
                    Text('${e.date} at ${e.odometer} km', style: const TextStyle(fontSize: 10, color: KtmTheme.textSecondary)),
                  ],
                ),
                Text(
                  '${e.mileage} km/L',
                  style: const TextStyle(fontWeight: FontWeight.w800, color: KtmTheme.success),
                ),
              ],
            ),
          )),
        ],
      ),
    );
  }

  Widget _buildRideLogsTab(AppStateProvider state) {
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: state.rideRecords.length,
      itemBuilder: (context, index) {
        final r = state.rideRecords[index];
        return Container(
          margin: const EdgeInsets.only(bottom: 12),
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            color: KtmTheme.card,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: KtmTheme.border),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(r.title, style: const TextStyle(fontWeight: FontWeight.w800, color: Colors.white)),
                  Text(r.leanAngle, style: const TextStyle(fontWeight: FontWeight.w800, color: KtmTheme.orange)),
                ],
              ),
              const SizedBox(height: 4),
              Text('${r.date} • ${r.durationStr}', style: const TextStyle(fontSize: 10, color: KtmTheme.textSecondary)),
              const SizedBox(height: 8),
              Row(
                children: [
                  Text('Dist: ${r.distanceKm} km', style: const TextStyle(fontSize: 12, color: Colors.white70)),
                  const SizedBox(width: 14),
                  Text('Avg: ${r.avgSpeed} km/h', style: const TextStyle(fontSize: 12, color: Colors.white70)),
                  const SizedBox(width: 14),
                  Text('Top: ${r.topSpeed} km/h', style: const TextStyle(fontSize: 12, color: KtmTheme.success)),
                ],
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildSosTab(AppStateProvider state) {
    return Padding(
      padding: const EdgeInsets.all(20),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: const Color(0x26FF3B30),
              border: Border.all(color: KtmTheme.danger, width: 2),
            ),
            child: const Icon(Icons.warning_amber_rounded, size: 64, color: KtmTheme.danger),
          ),
          const SizedBox(height: 16),
          const Text(
            'EMERGENCY SOS',
            style: TextStyle(fontSize: 22, fontWeight: FontWeight.w900, color: Colors.white),
          ),
          const SizedBox(height: 8),
          const Text(
            'Instant GPS broadcast to trusted emergency contacts.\nCoordinates: 12.9716° N, 80.2433° E',
            textAlign: TextAlign.center,
            style: TextStyle(fontSize: 12, color: KtmTheme.textSecondary),
          ),
          const SizedBox(height: 24),

          if (state.isSosActive) ...[
            Text(
              'DISPATCHING IN ${state.sosCountdown}s',
              style: const TextStyle(fontSize: 28, fontWeight: FontWeight.w900, color: KtmTheme.danger),
            ),
            const SizedBox(height: 14),
            ElevatedButton(
              onPressed: () => state.cancelEmergencySos(),
              style: ElevatedButton.styleFrom(backgroundColor: Colors.white, foregroundColor: Colors.black),
              child: const Text('I AM OKAY • CANCEL'),
            ),
          ] else ...[
            ElevatedButton.icon(
              onPressed: () => state.triggerEmergencySos(),
              icon: const Icon(Icons.sos),
              label: const Text('TRIGGER EMERGENCY SOS'),
              style: ElevatedButton.styleFrom(
                backgroundColor: KtmTheme.danger,
                padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
              ),
            ),
          ],
        ],
      ),
    );
  }
}
