import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireDatabaseModule} from '@angular/fire/compat/database'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TripListComponent } from './trip-list/trip-list.component';
import { TripComponent } from './trip/trip.component';
import { TripFormComponent } from './trip-form/trip-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component';
import { environment } from 'src/environments/environment';
import { MainPageComponent } from './main-page/main-page.component';
import { TripHistoryComponent } from './trip-history/trip-history.component';
import { SingleTripComponent } from './single-trip/single-trip.component';
@NgModule({
  declarations: [
    AppComponent,
    TripListComponent,
    TripComponent,
    TripFormComponent,
    CartComponent,
    MainPageComponent,
    TripHistoryComponent,
    SingleTripComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
