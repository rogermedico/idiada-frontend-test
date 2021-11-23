import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { inMemoryWebApiModule } from './in-memory-web-api';
import { MaterialModule } from './modules/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    // ReactiveFormsModule,
    // CardModule,
    // TableModule,
    // DialogModule,
    // ButtonModule,

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
