import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  name: string = '';
  lastname:String='';
  title:String="";
  tylko_wewnatrz: any;
  constructor(private roter:Router){}
  windowLocation=this.roter.url;
}
