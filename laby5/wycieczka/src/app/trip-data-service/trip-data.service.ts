import { Injectable } from '@angular/core';
import data from '../../assets/json/data.json';
import {AngularFireDatabase} from '@angular/fire/compat/database';
import { Observable} from 'rxjs'
import { Router } from '@angular/router';
import { AuthenticationServiceService } from '../authentication-service/authentication-service.service';
@Injectable({
  providedIn: 'root'
})
//najdroższa najtańsza do zmiany
export class TripDataService {
  // array=data;
  array!:any[];
  trips:Observable<unknown[]>;
  highlighted: number[]=[];
  avaible:boolean[]=[];
  currency='$';
  dataFireBase:any;
  soonerTrips:string[]=[];
  tripToEdit:string='';
  constructor(dataa:AngularFireDatabase,public router:Router,public authService:AuthenticationServiceService) {
    this.dataFireBase=dataa.list('/trips');
    this.trips= dataa.list('/trips').valueChanges();
    this.trips.subscribe(trip=>{
      this.array=trip;
      this.avaible=new Array(this.array.length);
      this.avaible.fill(true);
      this.highlightedUpdate();
    })
  }

  tripArray(){
    return this.array;
  }

  highlightedArray(){
    return this.highlighted;
  }

  avaibleArray(){
    return this.avaible;
  }

  public soonerTripsArray(){
    return this.soonerTrips;
  }
  
  public highlightedUpdate(){
    this.highlighted=[]
    let min=this.array.filter(a=>this.avaible[this.array.indexOf(a)]==true).map(a=>a.unitPrice).reduce((a,b)=>Math.min(a,b));
    let max=this.array.filter(a=>this.avaible[this.array.indexOf(a)]==true).map(a=>a.unitPrice).reduce((a,b)=>Math.max(a,b));
    this.array.forEach(a=>{
      if(this.avaible[this.array.indexOf(a)]==false){
        this.highlighted.push(-1);
      }
      else if(a.unitPrice==min){
        this.highlighted.push(1);
      }
      else if(a.unitPrice==max){
        this.highlighted.push(2);
      }
      else{
        this.highlighted.push(0);
      }
    })
  }

  public deleteComponet(index:number):void{
    console.log(index);
    this.authService.removeAllReservation(this.array[index]['index']);
    //removebought
    this.dataFireBase.remove(this.array[index]['index']);
  }

  public avaibleChange(i:number,avaibleToChange:boolean){
    if(this.avaible[i]!=avaibleToChange){
      this.avaible[i]=!this.avaible[i];
      this.highlightedUpdate();
    }
  }

  public multiply():number{
    switch(this.currency){
      case '$':
        return 1;
      case '€':
        return 0.95;
    }
    return 4.5;
  }

  public addToMap(index:string):void{
    this.authService.addReservation(index);
  }

  public substractFromMap(index:string):void{
    this.authService.removeReservation(index);
  }

  public addToArray(trip:any){
    console.log(trip);
    trip.imgCarousel=trip.imgCarousel.split(' ');
    let postedreference=this.dataFireBase.push();
    trip['index']=postedreference.getKey();
    trip['numberOfOpinion']=0;
    trip['opinionSum']=0;
    trip['opinions']=[];
    postedreference.set(trip);
    this.router.navigate(['/trip-list']); 
  }

  public buyTrip(index:string){
    this.dataFireBase.update(index,{'maxPlace':this.array.filter(a=> a.index==index)[0].maxPlace-this.authService.numberOfResevation(index)});
    this.authService.addBought(index);
  }

  public buyAll(){
    for(let trip of this.authService.getResevationArray()){
      if(trip.quantity>0){
        this.buyTrip(trip.index);
      }
    }
  }

  public addOpinion(opinonToAdd:any,index:string){
    let tempOpinons=[...this.tripArray().filter(a=>a.index==index)[0].opinions];
    let tempNumberOfOpinion=this.tripArray().filter(a=>a.index==index)[0].numberOfOpinion+1;
    let tempSumOpinion=this.tripArray().filter(a=>a.index==index)[0].opinionSum+opinonToAdd.rating;
    tempOpinons.push(opinonToAdd);
    console.log(tempOpinons,tempNumberOfOpinion,tempSumOpinion);
    this.dataFireBase.update(index,{opinions:tempOpinons,numberOfOpinion:tempNumberOfOpinion,opinionSum:tempSumOpinion});
  }

  public addToSoonerTripsWithChecked(index:string){
    let now=new Date();
    let startDay=new Date(this.tripArray().filter(a=>a.index==index)[0].start);
    let difference=startDay.getTime()-now.getTime();
    //converte to days
    difference=difference/(1000*60*60*24);
    if(difference>0 && difference<=30){
      return true;
    }
    return false;
  }

  public updateTrip(index:string,trip:any){
    trip.imgCarousel=trip.imgCarousel.split(' ');
    this.dataFireBase.update(index,trip);
  }
}
