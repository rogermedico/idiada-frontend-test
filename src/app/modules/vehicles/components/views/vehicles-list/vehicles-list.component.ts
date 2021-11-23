import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { VehiclesService } from '@modules/vehicles/services/vehicles.service';
import { VehicleView } from '@models/vehicleView';
import { VehicleDialogComponent } from '@modules/vehicles/components/dialogs/vehicle-dialog/vehicle-dialog.component';
import { filter, mergeMap, take, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@modules/vehicles/components/dialogs/confirm-dialog/confirm-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.scss'],
})
export class VehiclesListComponent implements OnInit, AfterViewInit {

  public vehicleList: MatTableDataSource<VehicleView> = new MatTableDataSource();
  public vehicle: VehicleView | undefined;
  public vehicleTableDisplayedColumns: string[] = ['id', 'plate', 'manufacturer', 'make', 'commercialName', 'vinNumber', 'capacity', 'actions']
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private vs: VehiclesService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.vs.getVehicles().pipe(
      take(1),
      tap((vehicles: VehicleView[]) => {
        this.vehicleList.data = vehicles
      })
    ).subscribe();
  }

  ngAfterViewInit(): void {
    this.vehicleList.paginator = this.paginator;
  }

  createVehicle(): void {
    const dialogRef = this.dialog.open(VehicleDialogComponent);
    dialogRef.afterClosed().pipe(
      take(1),
      filter(vehicleFormData => vehicleFormData),
      tap(vehicleFormData => {
        this.vs.createVehicle(vehicleFormData).subscribe(vehicle => {
          this.vehicleList.data = [...this.vehicleList.data, vehicle];
        })
      })
    ).subscribe();
  }

  updateVehicle(id: number): void {
    const vehicle = this.vehicleList.data.find(v => v.id === id);
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
        filter(newData => newData),
        tap(vehicleFormData => {
          const modifiedVehicle: VehicleView = {
            ...vehicleFormData,
            plate: vehicleFormData.plate.toUpperCase(),
            id: vehicle.id
          };
          this.vs.updateVehicle(modifiedVehicle).pipe(
            tap(() => {
              this.vehicleList.data = this.vehicleList.data.map((v: VehicleView) => {
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
      filter(result => result),
      tap(() => {
        this.vs.deleteVehicle(vehicle.id).pipe(
          take(1),
          tap(() => {
            this.vehicleList.data = this.vehicleList.data.filter((v: VehicleView) => v.id != vehicle.id);
          })
        ).subscribe();
      })).subscribe();
  }

  vehiclesApplyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.vehicleList.filter = filterValue.trim().toLowerCase();
  }

  exportExcel() {

    const wb = new Workbook();
    const ws = wb.addWorksheet();

    ws.addRow(['id', 'plate', 'manufacturer', 'make', 'commercialName', 'vinNumber', 'capacity']);
    ws.getRow(1).font = { bold: true };
    this.vehicleList.data.forEach(vehicle => {
      ws.addRow(Object.values(vehicle));
    });

    ws.columns.forEach(column => {
      if (column.values) {
        const lengths: number[] = column.values.map(v => {
          if (v) return v.toString().length;
          else return 0;
        });
        const maxLength = Math.max(...lengths.filter(v => typeof v === 'number'));
        column.width = maxLength + 10;
      }
    });

    wb.xlsx.writeBuffer().then(data => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, `vehicles-${new Date().valueOf()}.xlsx`);
    });
  }

}