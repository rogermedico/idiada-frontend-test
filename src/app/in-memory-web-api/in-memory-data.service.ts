import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { VehicleView } from '../models/vehicleView';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {

  private manufacturers = [
    {
      manufacturer: 'Renault Group',
      makes: [
        {
          make: 'Renault',
          commercialNames: [
            'Megane RS',
            'Clio RS',
            'Kadjar',
            'ZOE',
            'Twingo'
          ]
        }
      ]
    },
    {
      manufacturer: 'PSA Group',
      makes: [
        {
          make: 'Citroën',
          commercialNames: [
            'C4',
            'C5',
            'Berlingo'
          ]
        },
        {
          make: 'Peugeot',
          commercialNames: [
            '207',
            '3008',
            '5008'
          ]
        }
      ]
    },
    {
      manufacturer: 'VAG Group',
      makes: [
        {
          make: 'Volkswagen',
          commercialNames: [
            'Golf',
            'Touareg',
            'Cady'
          ]
        },
        {
          make: 'Audi',
          commercialNames: [
            'RS4',
            'A3',
            'S5'
          ]
        },
        {
          make: 'BMW',
          commercialNames: [
            'M1',
            'X3',
            'Serie 5'
          ]
        }
      ]
    }
  ];

  private getRandomData() {
    const manufacturer = this.manufacturers[Math.floor(Math.random() * this.manufacturers.length)];
    const make = manufacturer.makes[Math.floor(Math.random() * manufacturer.makes.length)];
    const commercialName = make.commercialNames[Math.floor(Math.random() * make.commercialNames.length)];

    return {
      plate: `${Math.floor(Math.random() * 9000 + 1000)}RMP`, // random between 1000 and 9999
      manufacturer: manufacturer.manufacturer,
      make: make.make,
      commercialName: commercialName,
      vinNumber: `${Math.floor(Math.random() * 100 + 100)}NGA${Math.floor(Math.random() * 900 + 100)}`, // random between 100 and 999
      capacity: Math.floor(Math.random() * 5) + 1 // random between 1 and 6
    }
  }

  private generateMockCars(): VehicleView[] {
    const vehicleList: VehicleView[] = [];
    for (let i = 1; i <= 25; i++) {
      const randomData = this.getRandomData();
      vehicleList.push(new VehicleView(
        i,
        randomData.plate,
        randomData.manufacturer,
        randomData.make,
        randomData.commercialName,
        randomData.vinNumber,
        randomData.capacity
      ));
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
