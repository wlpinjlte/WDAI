import { trigger } from '@angular/animations';
import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {TripDataService} from '../trip-data-service/trip-data.service';
import { AuthenticationServiceService } from '../authentication-service/authentication-service.service';
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
  currPlace!:number;
  stars:number=0;
  arrayToStars:number[]=[];
  constructor(public tripService:TripDataService,public authService:AuthenticationServiceService){}

  ngOnInit(): void {
    this.currPlace=this.object.maxPlace-this.tripService.reservationDetailMap().get(this.object.index)
    this.stars=(this.object.numberOfOpinion==0? 0:this.object.opinionSum/this.object.numberOfOpinion)
    let sizeOfArray=Math.floor(this.stars);
    this.arrayToStars=new Array(sizeOfArray);
    this.arrayToStars.map((k,v)=>v+1);
  }
  public addButton(): void{
    if(this.currPlace<this.object.maxPlace){
      this.currPlace=this.currPlace+1;
      this.avabileEmiter();
      console.log(this.currPlace);
      this.tripService.substractFromMap(this.object.index);
      console.log(this.object.index+"object");
    }
    
  }

  public substrackButton(): void{
    if(this.currPlace>0){
      this.currPlace=this.currPlace-1;
      this.avabileEmiter();
      this.tripService.addToMap(this.object.index);
    }
  }

  public getStockColor():string{
    if(this.currPlace==0){
      return "red";
    }
    if(this.currPlace<4){
      return "orange";
    }
    return "rgb(255,250,233)";
  }

  public getPColor():string{
    if(this.currPlace==0){
      return 'black';
    }
    else if(this.object.maxPlace-this.currPlace<10){
      return "red"
    }
    return "green";
  }
  
  public avabileEmiter(){
    if(this.currPlace==0){
      this.tripService.avaibleChange(this.index,false);
    }else{
      this.tripService.avaibleChange(this.index,true);
    }
  }

  public deleteComponet(){
    console.log(1);
    this.tripService.deleteComponet(this.index);
  }

  public starsChange(i:number):void{
    this.stars=i;
  }
}
