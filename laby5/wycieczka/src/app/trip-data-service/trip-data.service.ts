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
  reservationDetail=new Map();
  boughtTrips=new Map();
  dataFireBase:any;
  soonerTrips:string[]=[];

  constructor(dataa:AngularFireDatabase,public router:Router,public authService:AuthenticationServiceService) {
    this.dataFireBase=dataa.list('/trips');
    this.trips= dataa.list('/trips').valueChanges();
    this.trips.subscribe(trip=>{
      this.array=trip;
      this.avaible=[];
      this.array.forEach(a=>{//do zmiany
        if(!this.reservationDetail.has(a['index'])){
          this.reservationDetail.set(a['index'],0);
        }
        if(a.maxPlace-this.reservationDetail.get(a['index'])>0){
          this.avaible.push(true);
        }else{
          this.avaible.push(false);
        }
      })
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

  soonerTripsArray(){
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
    console.log(this.reservationDetail);
  }

  public substractFromMap(index:string):void{
    this.authService.removeReservation(index);
    console.log(this.reservationDetail);
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
    let now=new Date();
    let startOfTrip=new Date(this.array.filter(a=>a.index==index)[0].start);
    let difference=startOfTrip.getTime()-now.getTime();
    //converte to days
    difference=difference/(1000*60*60*24);
    console.log(difference);
    if(difference>0 && difference<=30&&this.soonerTripsArray().filter(a=>a==index).length==0){
      this.soonerTrips.push(index);
    }
    console.log(this.boughtTrips);
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
}
