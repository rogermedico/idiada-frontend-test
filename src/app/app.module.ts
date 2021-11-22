import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VehiclesListComponent } from './views/vehicles-list/vehicles-list.component';
import { VehicleDialogComponent } from './views/dialogs/vehicle-dialog/vehicle-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { inMemoryWebApiModule } from './in-memory-web-api';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ConfirmDialogComponent } from './views/dialogs/confirm-dialog/confirm-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    VehiclesListComponent,
    VehicleDialogComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    CardModule,
    TableModule,
    DialogModule,
    ButtonModule,

    FlexLayoutModule,
    inMemoryWebApiModule
  ],
  // schemas: [
  //   CUSTOM_ELEMENTS_SCHEMA,
  // ],
  providers: [

  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
