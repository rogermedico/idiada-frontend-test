import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './views/dialogs/confirm-dialog/confirm-dialog.component';
import { VehicleDialogComponent } from './views/dialogs/vehicle-dialog/vehicle-dialog.component';
import { VehiclesListComponent } from './views/vehicles-list/vehicles-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { VehiclesRoutingModule } from './vehicles-routing.module';

@NgModule({
  declarations: [
    VehiclesListComponent,
    VehicleDialogComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    VehiclesRoutingModule,
    MaterialModule,
    FlexLayoutModule,
  ]
})
export class VehiclesModule { }
