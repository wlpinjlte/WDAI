import { Injectable } from '@angular/core';
import data from '../../assets/json/data.json'

@Injectable({
  providedIn: 'root'
})

export class TripDataService {
  array=data;
  highlighted: number[]=[];
  avaible:boolean[]=[];

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
}
