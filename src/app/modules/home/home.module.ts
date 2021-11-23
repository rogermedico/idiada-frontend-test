import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@modules/material/material.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/views/home/home.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    FlexLayoutModule,
  ]
})
export class HomeModule { }
