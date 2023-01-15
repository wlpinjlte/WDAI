import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { observable, Observable } from 'rxjs';
import { AuthenticationServiceService } from '../authentication-service/authentication-service.service';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthenticationServiceService,private router:Router){}
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot):Observable<boolean> {
    console.log(route,state);
    return this.authService.isDateToTrips.pipe(map((res:any)=>{
      console.log(res);
      if(route.routeConfig?.path=='login'&&(this.authService.userStatus.admin==false&&this.authService.userStatus.manager==false&&this.authService.userStatus.user==false)){
        return true;
      }else if(this.authService.userStatus.admin==true&&route.routeConfig?.path!='login'){
        return true;
      }else if(this.authService.userStatus.manager==true&&(route.routeConfig?.path=='trip/:id'||route.routeConfig?.path=='trip-form'||route.routeConfig?.path=='trip-history')){
        return true;
      }else if(this.authService.userStatus.user==true&&(route.routeConfig?.path=='trip/:id'||route.routeConfig?.path=='trip-history')){
        return true;
      }
      this.router.navigate(['/main-page']);
      return false;
    }));
  }
}
