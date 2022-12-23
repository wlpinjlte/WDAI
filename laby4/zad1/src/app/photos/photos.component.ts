import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataserviceService } from '../dataservice.service';
@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit{
  public data: any;
  public constructor(private dataservice:DataserviceService) {}
  public ngOnInit(): void {
    this.dataservice.getphotos().subscribe((response) => {
      this.data = response;
    });
  }
}
