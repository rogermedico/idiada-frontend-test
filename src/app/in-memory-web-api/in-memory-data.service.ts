import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { VehicleView } from '../models/vehicleView';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {

  private generateMockCars(): VehicleView[] {
    const vehicleList: VehicleView[] = [];
    for (let i = 1; i <= 10; i++) {
      vehicleList.push({
        id: i,
        commercialName: 'Megane RS',
        make: 'Renault',
        manufacturer: 'Renault Group',
        plate: `778${i % 10}LLD`,
        vinNumber: `182NGA1${i}`,
        capacity: 1
      });
    }
    return vehicleList;
  }

  createDb() {
    const vehicles = this.generateMockCars();
    return { vehicles };
  }

  // Overrides the genId method to ensure that a vehicle always has an id.
  // If the vehicles array is empty, the method below returns the initial number (11).
  // If the vehicles array is not empty, the method below returns the highest vehicle id + 1.
  genId(vehicles: VehicleView[]): number {
    return vehicles.length > 0 ? Math.max(...vehicles.map(v => v.id)) + 1 : 11;
  }
}
