import { Component, OnInit, ViewChild } from '@angular/core';
import { VehiclesService } from '../../services/vehicles/vehicles.service';
import { VehicleView } from '../../domain/vehicleView';
import { VehicleDialogComponent } from '../vehicle-dialog/vehicle-dialog.component';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.scss'],
})
export class VehiclesListComponent implements OnInit {

  vehicleList: VehicleView[] = [];
  vehicle: VehicleView | undefined;
  @ViewChild(VehicleDialogComponent) vehicleDialogComponent: VehicleDialogComponent | undefined;

  constructor(private vehiclesService: VehiclesService) {

  }

  ngOnInit() {
    this.vehiclesService.getVehicles().pipe(
      tap(v => console.log('response')),
      tap(v => console.log(v))
    ).subscribe(
      (response: VehicleView[]) => this.onVehicleListCallSuccess(response)
    );
    // this.loadVehicles();
  }

  // private loadVehicles() {
  //   this.vehiclesService.loadVehicles().subscribe((response: VehicleView[]) => this.onVehicleListCallSuccess(response));
  // }

  private onVehicleListCallSuccess(response: VehicleView[]) {
    console.log(response)
    this.vehicleList = response.map(vehicle => {
      return new VehicleView(vehicle.id, vehicle.plate, vehicle.manufacturer, vehicle.make, vehicle.commercialName,
        vehicle.vinNumber, vehicle.capacity);
    });
  }

  showVehicleDialog(vehicle?: VehicleView) {
    this.vehicleDialogComponent?.showVehicleDialog(vehicle);
  }

}
