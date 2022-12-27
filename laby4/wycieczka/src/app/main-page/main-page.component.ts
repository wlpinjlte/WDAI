import { Component } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  l1=50.068223;
  l2=19.912975;
  zoom=15;
  clicked(event:any){
    console.log(event);
  }
}
