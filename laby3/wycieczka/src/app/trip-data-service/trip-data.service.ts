import { Injectable } from '@angular/core';
import data from '../../assets/json/data.json';

@Injectable({
  providedIn: 'root'
})

export class TripDataService {
  array=data;
  highlighted: number[]=[];
  avaible:boolean[]=[];
  currency='$';
  allOfReservation=0; 
  reservationDetail=new Map();

  constructor() {
    this.array.forEach(a=>{
      if(a.maxPlace>0){
        this.avaible.push(true);
      }else{
        this.avaible.push(false);
      }
    })
    this.highlightedUpdate();
    console.log(this.highlighted)
    console.log(this.avaible);
    console.log(this.array);
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
    if (index > -1) {
      if(this.reservationDetail.has(this.array[index].title)){
        console.log(1);
        this.allOfReservation-=this.reservationDetail.get(this.array[index].title)[0];
        this.reservationDetail.delete(this.array[index].title);
      }
      this.array.splice(index, 1);
      this.avaible.splice(index,1);
      if(this.highlighted[index]==1 || this.highlighted[index]==2){
        this.highlightedUpdate();
      }else{
        this.highlighted.splice(index, 1);
      }
    }
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

  public addToMap(title:string,unitPrice:number):void{
    if(this.reservationDetail.has(title)){
      this.reservationDetail.get(title)[0]+=1;
    }else{
      this.reservationDetail.set(title,[1,unitPrice]);
    }
    this.allOfReservation+=1;
    console.log(this.reservationDetail);
  }

  public substractFromMap(title:string):void{
    if(this.reservationDetail.has(title)){
      this.reservationDetail.get(title)[0]-=1;
      if(this.reservationDetail.get(title)[0]==0){
        this.reservationDetail.delete(title);
      }
      this.allOfReservation-=1;
    }
    console.log(this.reservationDetail);
  }
}
