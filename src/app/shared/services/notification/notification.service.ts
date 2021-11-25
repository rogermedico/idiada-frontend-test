import { Component, Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { CustomNotificationComponent } from './custom-notification/custom-notification.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  public snackBarDefaultProperties: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'bottom'
  }

  constructor(
    private snackBar: MatSnackBar,
    private zone: NgZone,
  ) { }

  showMessage(msg: string, action: string = '', config: MatSnackBarConfig = {}) {
    this.snackBar.open(msg, action, {
      duration: config.duration ? config.duration : this.snackBarDefaultProperties.duration,
      horizontalPosition: config.horizontalPosition ? config.horizontalPosition : this.snackBarDefaultProperties.horizontalPosition,
      verticalPosition: config.verticalPosition ? config.verticalPosition : this.snackBarDefaultProperties.verticalPosition,
      panelClass: ['message-snack']
    });
  }

  showMessageFromCustomNotificationComponent(msg: string, action: string = '', config: MatSnackBarConfig = {}) {
    this.snackBar.openFromComponent(CustomNotificationComponent, {
      data: {
        message: msg,
        action: action,
        duration: config.duration ? config.duration : this.snackBarDefaultProperties.duration,
        horizontalPosition: config.horizontalPosition ? config.horizontalPosition : this.snackBarDefaultProperties.horizontalPosition,
        verticalPosition: config.verticalPosition ? config.verticalPosition : this.snackBarDefaultProperties.verticalPosition,
      }
    });
  }

  showError(msg: string, action: string = '', config: MatSnackBarConfig = {}): void {
    this.zone.run(() => {
      this.snackBar.open(msg, action, {
        duration: config.duration ? config.duration : this.snackBarDefaultProperties.duration,
        horizontalPosition: config.horizontalPosition ? config.horizontalPosition : this.snackBarDefaultProperties.horizontalPosition,
        verticalPosition: config.verticalPosition ? config.verticalPosition : this.snackBarDefaultProperties.verticalPosition,
        panelClass: ['error-snack']
      });
    });
  }

}
