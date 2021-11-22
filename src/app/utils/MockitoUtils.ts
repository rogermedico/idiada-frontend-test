import {VehicleView} from '../domain/vehicleView';
import {IVehicleView} from '../domain/vehicleView';
import {Builder} from '../domain/Builder';


type IBuilder<T> = {
  [k in keyof T]: (arg: T[k]) => IBuilder<T>
} & { build(): T };

export class MockitoUtils {

  static vehicle: VehicleView;
  static vehicleList: VehicleView[];

  constructor() {
  }

  static createVehicle(id: number): VehicleView {
    return new Builder(VehicleView)
      .with({id: 1})
      .with({commercialName: 'Megane RS'})
      .with({make: 'Renault'})
      .with({manufacturer: 'Renault Group'})
      .with({plate: '7788 LLD'})
      .with({vinNumber: '182NGA19'})
      .with({capacity: 1})
      .build();
  }

  static createVehicleList(): VehicleView[] {
    this.vehicleList = [];
    for (let i = 1; i <= 11; i++) {
      this.vehicleList.push(new Builder(VehicleView)
        .with({id: i})
        .with({commercialName: 'Megane RS'})
        .with({make: 'Renault'})
        .with({manufacturer: 'Renault Group'})
        .with({plate: `778${i} LLD`})
        .with({vinNumber: `182NGA1${i}`})
        .with({capacity: 1})
        .build());
    }
    return this.vehicleList;
  }
}
