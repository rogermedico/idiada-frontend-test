import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { VehicleView } from '../../domain/vehicleView';

@Component({
  selector: 'app-vehicle-dialog',
  templateUrl: './vehicle-dialog.component.html',
  styleUrls: ['./vehicle-dialog.component.scss']
})
export class VehicleDialogComponent implements OnInit {

  displayVehicleDialog: boolean;
  vehicleForm: FormGroup;
  vehicle: VehicleView;

  constructor(private fb: FormBuilder) {
    this.vehicle = new VehicleView();
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(vehicle?: VehicleView) {
    if (vehicle == null) {
      this.vehicleForm = this.fb.group({
        'plate': new FormControl(null, [Validators.required]),
        'manufacturer': new FormControl(null, [Validators.required]),
        'make': new FormControl(null, [Validators.required]),
        'commercialName': new FormControl(null, [Validators.required]),
        'vinNumber': new FormControl(null),
        'capacity': new FormControl(null),
      });
    } else if (vehicle.id != null) {
      this.vehicleForm = this.fb.group({
        'plate': new FormControl(vehicle.plate, [Validators.required]),
        'manufacturer': new FormControl(vehicle.manufacturer, [Validators.required]),
        'make': new FormControl(vehicle.make, [Validators.required]),
        'commercialName': new FormControl(vehicle.commercialName, [Validators.required]),
        'vinNumber': new FormControl(vehicle.vinNumber),
        'capacity': new FormControl(vehicle.capacity),
      });
    }

  }

  showVehicleDialog(vehicle?: VehicleView) {
    this.initForm(vehicle);
    this.displayVehicleDialog = true;
  }
}
