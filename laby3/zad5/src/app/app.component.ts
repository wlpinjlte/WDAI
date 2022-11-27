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
  showFinalPosition=false
  titleTextName='Choose Car Name';
  titleTextModel="Choose Car Model";
  titleTextColor="Choose Car Color";

  public carNameChoose(name:string): void{
    this.name=name;
    this.showName=false;
    this.titleTextName="Chose car";
    this.showModel=true;
    this.carModel=data.data[name as keyof typeof data.data].models;
    this.carColor=data.data[name as keyof typeof data.data].colors;
  }
  public carModelChoose(model:string):void{
    this.model=model;
    this.showModel=false;
    this.titleTextModel="Chose Model";
    this.showColor=true;
    
  }
  public carColorChoose(color:string):void{
    this.color=color;
    this.showColor=false;
    this.titleTextModel="Chose Model";
    this.showFinalPosition=true;
  }
  public reset(){
    this.name='';
    this.model='';
    this.color='';
    this.showName=true;
    this.showModel=false;
    this.showColor=false;
    this.showFinalPosition=false
    this.titleTextName='Choose Car Name';
    this.titleTextModel="Choose Car Model";
    this.titleTextColor="Choose Car Color";
  }
}
