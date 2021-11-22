import { Component, OnInit } from '@angular/core';
import { VehiclesService } from '../../services/vehicles.service';
import { VehicleView } from '../../../../models/vehicleView';
import { VehicleDialogComponent } from '../dialogs/vehicle-dialog/vehicle-dialog.component';
import { take, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.scss'],
})
export class VehiclesListComponent implements OnInit {

  vehicleList: VehicleView[] = [];
  vehicle: VehicleView | undefined;

  constructor(
    private vs: VehiclesService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.vs.getVehicles().pipe(
      take(1),
      tap((vehicles: VehicleView[]) => {
        this.vehicleList = vehicles
      })
    ).subscribe();
  }

  createVehicle(): void {
    const dialogRef = this.dialog.open(VehicleDialogComponent);
    dialogRef.afterClosed().pipe(
      take(1),
      tap(vehicleFormData => {
        this.vs.createVehicle(vehicleFormData).subscribe(vehicle => {
          this.vehicleList = [...this.vehicleList, vehicle];
        })
      })
    ).subscribe();
  }

  updateVehicle(id: number): void {
    const vehicle = this.vehicleList.find(v => v.id === id);
    if (vehicle) {
      const dialogRef = this.dialog.open(VehicleDialogComponent, {
        data: {
          plate: vehicle?.plate,
          manufacturer: vehicle?.manufacturer,
          make: vehicle?.make,
          commercialName: vehicle?.commercialName,
          vinNumber: vehicle?.vinNumber,
          capacity: vehicle?.capacity,
        }
      });
      dialogRef.afterClosed().pipe(
        take(1),
        tap(vehicleFormData => {
          const modifiedVehicle: VehicleView = {
            ...vehicleFormData,
            id: vehicle.id
          };
          this.vs.updateVehicle(modifiedVehicle).pipe(
            tap(() => {
              this.vehicleList = this.vehicleList.map((v: VehicleView) => {
                if (v.id != modifiedVehicle.id) return v;
                else return modifiedVehicle;
              });
            })
          ).subscribe();
        })
      ).subscribe();
    }
  }

  deleteVehicle(vehicle: VehicleView): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        question: 'Are you sure to delete the vehicle with the following plate:',
        element: vehicle.plate
      }
    });

    dialogRef.afterClosed().pipe(
      take(1),
      tap((result: boolean) => {
        if (result) {
          this.vs.deleteVehicle(vehicle.id).pipe(
            take(1),
            tap(() => {
              this.vehicleList = this.vehicleList.filter((v: VehicleView) => v.id != vehicle.id);
            })
          ).subscribe();
        }
      })).subscribe();
  }


}
