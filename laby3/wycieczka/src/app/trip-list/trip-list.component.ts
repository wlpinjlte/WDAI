import { Component } from '@angular/core';
import data from '../../assets/json/data.json'
@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent {
  array=data;
  highlighted: number[]=[];
  avaible:boolean[]=[];

  public highlightedUpdate(){
    this.highlighted=[]
    let min=this.array.filter(a=>this.avaible[this.array.indexOf(a)]==true).map(a=>a.unitPrice).reduce((a,b)=>Math.min(a,b));
    let max=this.array.filter(a=>this.avaible[this.array.indexOf(a)]==true).map(a=>a.unitPrice).reduce((a,b)=>Math.max(a,b));
    this.array.forEach(a=>{
      if(a.unitPrice==min){
        this.highlighted.push(1)
      }
      else if(a.unitPrice==max){
        this.highlighted.push(2);
      }
      else{
        this.highlighted.push(0);
      }
    })
    console.log(2);
  }

  constructor(){
    this.array.forEach(a=>{
      if(a.maxPlace>0){
        this.avaible.push(true);
      }else{
        this.avaible.push(false);
      }
    })
    this.highlightedUpdate();
    console.log(this.highlighted)
  }

  public deleteComponet(index:number):void{
    if (index > -1) {
      this.array.splice(index, 1);
      this.avaible.splice(index,1);
      if(this.highlighted[index]!=0){
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
    }
  }
}
