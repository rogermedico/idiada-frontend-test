export interface IVehicleView {
  id: number | null | undefined;
  plate: string | null;
  manufacturer: string | null;
  make: string | null;
  commercialName: string | null;
  vinNumber: string | null;
  capacity: number | null;
}

export class VehicleView implements IVehicleView {
  id: number | null | undefined = null;
  plate: string | null;
  manufacturer: string | null;
  make: string | null;
  commercialName: string | null;
  vinNumber: string | null;
  capacity: number | null;

  constructor(
    id?: number | null,
    plate?: string | null,
    manufacturer?: string | null,
    make?: string | null,
    commercialName?: string | null,
    vinNumber?: string | null,
    capacity?: number | null
  ) {
    this.id = id || null;
    this.plate = plate || null;
    this.manufacturer = manufacturer || null;
    this.make = make || null;
    this.commercialName = commercialName || null;
    this.vinNumber = vinNumber || null;
    this.capacity = capacity || null;
  }
}
