import { trigger } from '@angular/animations';
import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {TripDataService} from '../trip-data-service/trip-data.service';
import { AuthenticationServiceService } from '../authentication-service/authentication-service.service';
import { Observable } from 'rxjs';
export interface tripData{
  title:string;
  Contry:string;
  start:string;
  end:string;
  unitPrice:number;
  maxPlace:number;
  index:string;
  img:string;
  description:string;
  imgCarousel:string[];
  opinionSum:number;
  numberOfOpinion:number;
  opinions:any[];
}
@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})  


export class TripComponent implements OnInit{
  @Input()object: tripData={title:"",Contry:"",start:'',end:'',unitPrice:0,maxPlace:0,index:'',img:'',description:'',imgCarousel:[],opinionSum:0,numberOfOpinion:0,opinions:[]};
  @Input()index: number=-1;
  stars:number=0;
  arrayToStars:number[]=[];
  constructor(public tripService:TripDataService,public authService:AuthenticationServiceService){}
  curr:number=0;

  ngOnInit() {
    this.curr=this.object.maxPlace;
    this.stars=(this.object.numberOfOpinion==0? 0:this.object.opinionSum/this.object.numberOfOpinion)
    let sizeOfArray=Math.floor(this.stars);
    this.arrayToStars=new Array(sizeOfArray);
    this.arrayToStars.map((k,v)=>v+1);
    this.authService.isDateToTrips.asObservable().subscribe((res)=>{
      if(res){
        this.currUpadte();
      }
    })
  }

  public addButton(): void{
    if(this.curr<this.object.maxPlace){
      this.curr+=1;
      this.avabileEmiter();
      this.tripService.substractFromMap(this.object.index);
      console.log(this.object.index+"object");
    }
  }

  public substrackButton(): void{
    if(this.curr>0){
      this.curr-=1;
      this.avabileEmiter();
      this.tripService.addToMap(this.object.index);
    }
  }

  public getStockColor():string{
    if(this.curr==0){
      return "red";
    }
    if(this.curr<4){
      return "orange";
    }
    return "rgb(255,250,233)";
  }

  public getPColor():string{
    if(this.curr==0){
      return 'black';
    }
    else if(this.curr<10){
      return "red"
    }
    return "green";
  }
  
  public avabileEmiter(){
    if(this.curr==0){
      this.tripService.avaibleChange(this.index,false);
    }else{
      this.tripService.avaibleChange(this.index,true);
    }
  }

  public deleteComponet(){
    this.tripService.deleteComponet(this.index);
  }

  public starsChange(i:number):void{
    this.stars=i;
  }
  
  public currUpadte(){
      let numberOfResevation=this.authService.numberOfReservationMap.has(this.object.index)? this.authService.numberOfReservationMap.get(this.object.index):0;
      this.curr=this.object.maxPlace-numberOfResevation;
      this.avabileEmiter();
  }

  public modifyTrip(){
    this.tripService.tripToEdit=this.object.index;
  }
}
