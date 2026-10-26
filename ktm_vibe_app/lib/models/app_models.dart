class BikeProfile {
  final String id;
  final String model;
  final String year;
  final String nickname;
  final int odometer;
  final int fuelLevel;
  final double batteryVoltage;
  final String tftStatus;
  final bool tftVerified;
  final String deviceName;

  BikeProfile({
    required this.id,
    required this.model,
    required this.year,
    required this.nickname,
    required this.odometer,
    required this.fuelLevel,
    required this.batteryVoltage,
    required this.tftStatus,
    required this.tftVerified,
    required this.deviceName,
  });

  BikeProfile copyWith({
    String? id,
    String? model,
    String? year,
    String? nickname,
    int? odometer,
    int? fuelLevel,
    double? batteryVoltage,
    String? tftStatus,
    bool? tftVerified,
    String? deviceName,
  }) {
    return BikeProfile(
      id: id ?? this.id,
      model: model ?? this.model,
      year: year ?? this.year,
      nickname: nickname ?? this.nickname,
      odometer: odometer ?? this.odometer,
      fuelLevel: fuelLevel ?? this.fuelLevel,
      batteryVoltage: batteryVoltage ?? this.batteryVoltage,
      tftStatus: tftStatus ?? this.tftStatus,
      tftVerified: tftVerified ?? this.tftVerified,
      deviceName: deviceName ?? this.deviceName,
    );
  }
}

class RideRecord {
  final String id;
  final String date;
  final String title;
  final double distanceKm;
  final String durationStr;
  final double avgSpeed;
  final double topSpeed;
  final String leanAngle;

  RideRecord({
    required this.id,
    required this.date,
    required this.title,
    required this.distanceKm,
    required this.durationStr,
    required this.avgSpeed,
    required this.topSpeed,
    required this.leanAngle,
  });
}

class ServiceReminder {
  final String id;
  final String title;
  final int dueOdometer;
  final String status;
  final bool urgent;
  final double percentage;

  ServiceReminder({
    required this.id,
    required this.title,
    required this.dueOdometer,
    required this.status,
    required this.urgent,
    required this.percentage,
  });

  ServiceReminder copyWith({
    String? status,
    bool? urgent,
    double? percentage,
    int? dueOdometer,
  }) {
    return ServiceReminder(
      id: id,
      title: title,
      dueOdometer: dueOdometer ?? this.dueOdometer,
      status: status ?? this.status,
      urgent: urgent ?? this.urgent,
      percentage: percentage ?? this.percentage,
    );
  }
}

class FuelEntry {
  final int id;
  final String date;
  final double litres;
  final double cost;
  final int odometer;
  final double mileage;

  FuelEntry({
    required this.id,
    required this.date,
    required this.litres,
    required this.cost,
    required this.odometer,
    required this.mileage,
  });
}

class NavStep {
  final String destination;
  final int distanceMeters;
  final String turnInstruction;
  final String roadName;

  NavStep({
    required this.destination,
    required this.distanceMeters,
    required this.turnInstruction,
    required this.roadName,
  });

  NavStep copyWith({
    String? destination,
    int? distanceMeters,
    String? turnInstruction,
    String? roadName,
  }) {
    return NavStep(
      destination: destination ?? this.destination,
      distanceMeters: distanceMeters ?? this.distanceMeters,
      turnInstruction: turnInstruction ?? this.turnInstruction,
      roadName: roadName ?? this.roadName,
    );
  }
}
