import { Component } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  title:string="";
  description:string="";
  public data:any;
  public constructor(private dataService:DataserviceService) {}
  public ngOnInit(): void {
    this.dataService.getposts().subscribe((response) => {
      this.data = response;
      console.log(this.data)
    });
  }
  public sendPost(){
    console.log(this.title)
    let postToSend={
      userId:0,
      id:123,
      title:this.title,
      body:this.description
    }
    this.dataService.sendPost(JSON.stringify(postToSend)).subscribe(res=>{this.data.push(res)});
  }
}
