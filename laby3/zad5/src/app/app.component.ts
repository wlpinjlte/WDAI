import { Component } from '@angular/core';
import data from '../assets/json/data.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'zad5';
  carName=Object.keys(data.data);
  carModel: any;
  carColor: any;
  name='';
  model='';
  color='';
  showName=true;
  showModel=false;
  showColor=false;
  showFinalPosition=false;

  public carNameChoose(): void{
    this.showName=false;
    this.showModel=false;
    this.showModel=true;
    this.showColor=false;
    this.model='';
    this.showFinalPosition=false;
    this.carModel=data.data[this.name as keyof typeof data.data].models;
    this.carColor=data.data[this.name as keyof typeof data.data].colors;
  }
  public carModelChoose():void{
    this.showColor=true;
  }
  public carColorChoose(color:string):void{
    this.color=color;
    this.showFinalPosition=true;
  }
}
