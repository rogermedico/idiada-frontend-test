export interface IVehicleView {
  id: number;
  plate: string;
  manufacturer: string;
  make: string;
  commercialName: string;
  vinNumber: string;
  capacity: number;
}

export class VehicleView implements IVehicleView {
  id: number = null;
  plate: string;
  manufacturer: string;
  make: string;
  commercialName: string;
  vinNumber: string;
  capacity: number;

  constructor(id?: number, plate?: string, manufacturer?: string, make?: string, commercialName?: string,
              vinNumber?: string, capacity?: number) {
    this.id = id || null;
    this.plate = plate || null;
    this.manufacturer = manufacturer || null;
    this.make = make || null;
    this.commercialName = commercialName || null;
    this.vinNumber = vinNumber || null;
    this.capacity = capacity || null;
  }
}
