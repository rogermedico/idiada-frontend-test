import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, of } from 'rxjs';
import { VehicleView } from '../../../models/vehicleView';

import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getVehicles(): Observable<VehicleView[]> {
    return this.http.get<VehicleView[]>(environment.vehicleEndpoint).pipe(
      catchError(err => this.handleError<VehicleView[]>(err, 'getVehicles', []))
    );
  }

  getVehicle(id: number): Observable<VehicleView> {
    return this.http.get<VehicleView>(`${environment.vehicleEndpoint}/${id}`).pipe(
      catchError(err => this.handleError<VehicleView>(err, 'getVehicles'))
    );
  }

  createVehicle(vehicle: VehicleView): Observable<VehicleView> {
    return this.http.post<VehicleView>(environment.vehicleEndpoint, vehicle, this.httpOptions).pipe(
      catchError(err => this.handleError<VehicleView>(err, 'createVehicle'))
    );
  }

  deleteVehicle(vehicle: VehicleView | number): Observable<VehicleView> {
    const id = typeof vehicle === 'number' ? vehicle : vehicle.id;
    return this.http.delete<VehicleView>(`${environment.vehicleEndpoint}/${id}`, this.httpOptions).pipe(
      catchError(err => this.handleError<VehicleView>(err, 'deleteVehicle'))
    );
  }

  updateVehicle(vehicle: VehicleView): Observable<null | VehicleView> {
    return this.http.put<VehicleView>(environment.vehicleEndpoint, vehicle, this.httpOptions).pipe(
      catchError(err => this.handleError<VehicleView>(err, 'updateVehicle'))
    );
  }

  private handleError<T>(err: Error, method: string, result?: T): Observable<T> {
    console.error(`${method} failed: ${err.message}`);
    return of(result as T);
  }

}

