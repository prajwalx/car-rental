import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { LandingComponent } from './landing/landing.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatSidenavModule,
        MatRadioModule,
        MatCheckboxModule,
        MatDividerModule,
        MatPaginatorModule
      } from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DetailsPageComponent } from './details-page/details-page.component';
import {SearchBoxPipe} from './search-box.pipe';
import {ObjectFilterPipe} from './object-filter.pipe';
import {DayFilterPipe} from './day-filter.pipe';
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LandingComponent,
    DetailsPageComponent,
    SearchBoxPipe,
    ObjectFilterPipe,
    DayFilterPipe
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
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDividerModule,
    MatPaginatorModule
  ],
  providers: [
    MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
