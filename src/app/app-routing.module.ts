import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
  { path: 'vehicles', loadChildren: () => import('./modules/vehicles/vehicles.module').then((m) => m.VehiclesModule) },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
