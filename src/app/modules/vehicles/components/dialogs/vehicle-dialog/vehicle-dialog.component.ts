import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ThemeService } from '@shared/services/theme.service';

@Component({
  selector: 'app-vehicle-dialog',
  templateUrl: './vehicle-dialog.component.html',
  styleUrls: ['./vehicle-dialog.component.scss']
})
export class VehicleDialogComponent implements OnInit {

  public vehicleFormGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<VehicleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      plate: string | null;
      manufacturer: string | null;
      make: string | null;
      commercialName: string | null;
      vinNumber: string | null;
      capacity: number | null;
    },
    public themeService: ThemeService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.vehicleFormGroup = this.fb.group({
      plate: [
        this.data ? this.data.plate : null,
        [
          Validators.required,
          Validators.pattern('^[0-9]{4}[a-zA-Z]{3}$')
        ]
      ],
      manufacturer: [
        this.data ? this.data.manufacturer : null,
        [
          Validators.required,
        ]
      ],
      make: [
        this.data ? this.data.make : null,
        [
          Validators.required,
        ]
      ],
      commercialName: [
        this.data ? this.data.commercialName : null,
        [
          Validators.required,
        ]
      ],
      vinNumber: [
        this.data ? this.data.vinNumber : null,
        [
          Validators.required,
        ]
      ],
      capacity: [
        this.data ? this.data.capacity : null,
        [
          Validators.required,
        ]
      ],
    });

  }

  onCloseDialog(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.dialogRef.close(this.vehicleFormGroup.value);
  }

}