import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'zad6';
  name:string="";
  public Clicked(topic:string){
    this.name=topic;
  }
}
