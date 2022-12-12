import { trigger } from '@angular/animations';
import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {TripDataService} from '../trip-data-service/trip-data.service';
export interface tripData{
  title:string;
  Contry:string;
  start:string;
  end:string;
  unitPrice:number;
  maxPlace:number;
  img:string;
  description:string;
}
@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})  


export class TripComponent implements OnInit{
  @Input()object: tripData={title:"",Contry:"",start:'',end:'',unitPrice:0,maxPlace:0,img:'',description:''};
  @Input()index: number=-1;
  stars:number=0;
  currPlace!: number;
  constructor(public tripService:TripDataService){}

  ngOnInit() {
    this.currPlace=this.object.maxPlace;
  }
  
  public addButton(): void{
    if(this.currPlace<this.object.maxPlace){
      this.currPlace=this.currPlace+1;
      this.avabileEmiter();
      console.log(this.currPlace);
      this.tripService.substractFromMap(this.object.title);
    }
    
  }

  public substrackButton(): void{
    if(this.currPlace>0){
      this.currPlace=this.currPlace-1;
      this.avabileEmiter();
      this.tripService.addToMap(this.object.title,this.object.unitPrice);
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
