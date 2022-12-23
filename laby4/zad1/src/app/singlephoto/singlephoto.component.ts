import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataserviceService } from '../dataservice.service';
@Component({
  selector: 'app-singlephoto',
  templateUrl: './singlephoto.component.html',
  styleUrls: ['./singlephoto.component.css']
})
export class SinglephotoComponent implements OnInit{
  data:any;
  id:number=-1;
  constructor(private route: ActivatedRoute,private dataService:DataserviceService){}
  public ngOnInit(){
    this.route.params.subscribe(params=>{
      this.id=params['id'];
    })
    this.route.params.subscribe().unsubscribe();
    this.dataService.getSinglePhotos(this.id).subscribe((response) => {
      this.data = response;
    });
  }
}
