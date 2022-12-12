import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TripListComponent } from './trip-list/trip-list.component';
import { TripComponent } from './trip/trip.component';
import { TripFormComponent } from './trip-form/trip-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component';
@NgModule({
  declarations: [
    AppComponent,
    TripListComponent,
    TripComponent,
    TripFormComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent,TripFormComponent]
})
export class AppModule { }
