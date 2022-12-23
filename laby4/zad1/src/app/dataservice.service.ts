import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
  public data: any;
  public constructor(private http: HttpClient) {}
  public getphotos():Observable<object>{
    const url: string = 'https://jsonplaceholder.typicode.com/photos';
    return this.http.get(url);
  }
  public getposts():Observable<object>{
    const url: string = 'https://jsonplaceholder.typicode.com/posts';
    return this.http.get(url);
  }
  public getSinglePhotos(id:number):Observable<object>{
    const url: string = 'https://jsonplaceholder.typicode.com/photos/'+id.toString();
    return this.http.get(url);
  }
  public sendPost(body: string): Observable<object>{
    return this.http.post<object>("http://jsonplaceholder.typicode.com/posts", body, {headers: new HttpHeaders({'Content-type': 'application/json; charset=UTF-8'})})
  }
}
