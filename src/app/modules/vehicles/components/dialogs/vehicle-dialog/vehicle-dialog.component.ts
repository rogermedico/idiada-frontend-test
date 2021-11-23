import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { UsersState } from '@modules/users/store/users.state';
// import { Store } from '@ngrx/store';
// import { AppState } from '@store/root.state';
// import * as UsersSelectors from '@modules/users/store/users.selector';
// import * as UserSelectors from '@modules/user/store/user.selector';
// import * as AppConstantsSelectors from '@store/app-constants/app-constants.selector';
import { combineLatest, Observable, Subscriber, Subscription } from 'rxjs';
// import { userTypeValidator } from '@validators/userType.validator';
// import { UserState } from '@modules/user/store/user.state';
import { filter, map, take } from 'rxjs/operators';
// import { UserType } from '@models/user-type.model';
// import { NewUser } from '@models/user.model';
// import { PasswordGeneratorService } from '@services/password-generator.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ThemeService } from '../../../../../shared/theme.service';

@Component({
  selector: 'app-vehicle-dialog',
  templateUrl: './vehicle-dialog.component.html',
  styleUrls: ['./vehicle-dialog.component.scss']
})
export class VehicleDialogComponent implements OnInit {

  public vehicleFormGroup!: FormGroup;
  // public usersState$: Observable<UsersState> = this.store$.select(UsersSelectors.selectUsersState);
  // public userState$: Observable<UserState> = this.store$.select(UserSelectors.selectUserState);
  // public userTypes$: Observable<UserType[]> = this.store$.select(AppConstantsSelectors.selectUserTypes);
  // public combinedUserUserTypesStateSubscription: Subscription;
  // public usersStateSubscription: Subscription;
  // public userTypes: UserType[];

  constructor(
    // private store$: Store<AppState>,
    private fb: FormBuilder,
    // private passwordGenerator: PasswordGeneratorService,
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