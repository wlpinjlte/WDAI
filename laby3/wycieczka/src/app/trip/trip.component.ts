import { Component, Input,OnInit } from '@angular/core';

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
  @Input()object!: tripData;
  @Input()highlight!: number;
  currPlace!: number;
  ngOnInit() {
    this.currPlace=this.object.maxPlace;
    console.log(this.highlight);
  }
  public addButton(): void{
    this.currPlace=Math.min(this.currPlace+1,this.object.maxPlace);
    console.log(this.currPlace);
  }
  public substrackButton(): void{
    this.currPlace=Math.max(this.currPlace-1,0);
    console.log(this.currPlace);
  }
  public getColor():string{
    if(this.currPlace==0){
      return "red";
    }
    if(this.currPlace<4){
      return "orange";
    }
    return "white";
  }
}
