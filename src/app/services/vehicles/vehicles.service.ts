import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { from, observable, Observable, of } from 'rxjs';
import { VehicleView } from '../../domain/vehicleView';
import { MockitoUtils } from '../../utils/MockitoUtils';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  url: string;
  headers: { 'Content-Type': 'application/json' };

  constructor(public http: HttpClient, private injector: Injector) {
    this.url = environment.domainUrl + 'vehicles';
  }

  loadVehicles(): Observable<VehicleView[]> {
    // return from(new Promise((resolve, reject) => {
    //   resolve(MockitoUtils.createVehicleList());
    // }
    // ));
    return of(MockitoUtils.createVehicleList());
  }

  createVehicle(vehicleView: VehicleView): Observable<VehicleView> {
    return this.http.post<VehicleView>(this.url, vehicleView, { headers: this.headers });
  }

}
