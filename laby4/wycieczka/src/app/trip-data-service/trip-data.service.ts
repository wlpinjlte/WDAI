import { Injectable } from '@angular/core';
import data from '../../assets/json/data.json';
import {AngularFireDatabase} from '@angular/fire/compat/database';
import { Observable} from 'rxjs'
@Injectable({
  providedIn: 'root'
})

export class TripDataService {
  // array=data;
  array!:any[];
  trips:Observable<unknown[]>;
  highlighted: number[]=[];
  avaible:boolean[]=[];
  currency='$';
  allOfReservation=0; 
  reservationDetail=new Map();
  boughtTrips=new Map();
  dataFireBase:any;

  constructor(dataa:AngularFireDatabase) {
    this.dataFireBase=dataa.list('/trips');
    this.trips= dataa.list('/trips').valueChanges();
    this.trips.subscribe(trip=>{
      this.array=trip;
      this.avaible=[];
      this.array.forEach(a=>{
        if(!this.reservationDetail.has(a['index'])){
          this.reservationDetail.set(a['index'],0);
          console.log(this.reservationDetail)
        }
        if(a.maxPlace-this.reservationDetail.get(a['index'])>0){
          this.avaible.push(true);
        }else{
          this.avaible.push(false);
        }
      })
      this.highlightedUpdate();
      console.log(trip);
    })
  }

  reservationDetailMap(){
    return this.reservationDetail;
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

  boughtTripsMap(){
    return this.boughtTrips;
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
    console.log(this.highlighted);
  }

  public deleteComponet(index:number):void{
    console.log(index);
    this.allOfReservation-=this.reservationDetail.get(this.array[index]['index']);
    this.reservationDetail.delete(this.array[index]['index']);
    this.dataFireBase.remove(this.array[index]['index']);
    console.log(this.highlighted);
  }

  public avaibleChange(i:number,avaibleToChange:boolean){
    if(this.avaible[i]!=avaibleToChange){
      this.avaible[i]=!this.avaible[i];
      this.highlightedUpdate();
      console.log(this.highlighted);
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
    this.reservationDetail.set(index,this.reservationDetail.get(index)+1);
    this.allOfReservation+=1;
    console.log(this.reservationDetail);
  }

  public substractFromMap(index:string):void{
    this.reservationDetail.set(index,this.reservationDetail.get(index)-1);
    this.allOfReservation-=1;
    console.log(this.reservationDetail);
  }

  public addToArray(trip:any){
    let postedreference=this.dataFireBase.push();
    trip['index']=postedreference.getKey();
    postedreference.set(trip);
  }

  public buyTrip(index:string){
    if(this.boughtTrips.has(index)){
      this.boughtTrips.set(index,this.boughtTrips.get(index)+this.reservationDetail.get(index));
    }else{
      this.boughtTrips.set(index,this.reservationDetail.get(index));
    }
    this.allOfReservation-=this.reservationDetail.get(index);
    this.array.filter(a=> a.index==index)[0].maxPlace-=this.reservationDetail.get(index);
    this.reservationDetail.set(index,0);
    console.log(this.boughtTrips);
  }

  public buyAll(){
    for(let trip of this.reservationDetail.entries()){
      if(trip[1]>0){
        this.buyTrip(trip[0]);
      }
    }
  }
}
