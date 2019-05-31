import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { LandingComponent } from './landing/landing.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule,MatNativeDateModule,MatFormFieldModule,MatInputModule,MatAutocompleteModule,MatButtonModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LandingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,    
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    HttpClientModule
  ],
  providers: [
    MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
