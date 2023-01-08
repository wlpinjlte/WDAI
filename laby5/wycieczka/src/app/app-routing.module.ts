import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { TripListComponent } from './trip-list/trip-list.component';
import { TripFormComponent } from './trip-form/trip-form.component';
import { TripHistoryComponent } from './trip-history/trip-history.component';
import { SingleTripComponent } from './single-trip/single-trip.component';
import { LoginPageComponent } from './login-page/login-page.component';
const routes: Routes = [
  { path: 'main-page', component: MainPageComponent },
  { path: 'login',component:LoginPageComponent},
  { path: 'trip/:id', component: SingleTripComponent},
  { path: 'trip-list', component: TripListComponent},
  { path: 'trip-form', component: TripFormComponent },
  { path: 'trip-history', component: TripHistoryComponent},
  { path: '', redirectTo: '/main-page', pathMatch: 'full' }
// { path: '**', component: PageNotFoundComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
