import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

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
  @Output() avaible = new EventEmitter<boolean>();
  @Output() delete=new EventEmitter();
  currPlace!: number;

  ngOnInit() {
    this.currPlace=this.object.maxPlace;
    console.log(this.highlight);
  }

  public addButton(): void{
    this.currPlace=Math.min(this.currPlace+1,this.object.maxPlace);
    this.avabileEmiter();
    console.log(this.currPlace);
  }

  public substrackButton(): void{
    this.currPlace=Math.max(this.currPlace-1,0);
    this.avabileEmiter();
    console.log(this.currPlace);
  }

  public getStockColor():string{
    if(this.currPlace==0){
      return "red";
    }
    if(this.currPlace<4){
      return "orange";
    }
    return "white";
  }

  public getPColor():string{
    if(this.object.maxPlace-this.currPlace>=10){
      return "red"
    }
    return "green";
  }
  public avabileEmiter(){
    if(this.currPlace==0){
      this.avaible.emit(false);
    }else{
      this.avaible.emit(true);
    }
  }
  public deleteComponet(){
    this.delete.emit();
  }
}
