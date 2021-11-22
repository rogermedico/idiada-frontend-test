export interface IVehicleView {
  id?: number;
  plate: string | null;
  manufacturer: string | null;
  make: string | null;
  commercialName: string | null;
  vinNumber: string | null;
  capacity: number | null;
}

export class VehicleView implements IVehicleView {
  id: number;
  plate: string | null;
  manufacturer: string | null;
  make: string | null;
  commercialName: string | null;
  vinNumber: string | null;
  capacity: number | null;

  constructor(
    id: number,
    plate?: string | null,
    manufacturer?: string | null,
    make?: string | null,
    commercialName?: string | null,
    vinNumber?: string | null,
    capacity?: number | null
  ) {
    this.id = id;
    this.plate = plate || null;
    this.manufacturer = manufacturer || null;
    this.make = make || null;
    this.commercialName = commercialName || null;
    this.vinNumber = vinNumber || null;
    this.capacity = capacity || null;
  }
}
