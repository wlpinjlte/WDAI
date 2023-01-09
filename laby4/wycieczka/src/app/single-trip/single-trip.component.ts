import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripDataService } from '../trip-data-service/trip-data.service';
import { ReactiveFormsModule,FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-single-trip',
  templateUrl: './single-trip.component.html',
  styleUrls: ['./single-trip.component.css','../../assets/bootstrap/bootstrap.min.css']
})
export class SingleTripComponent {
  index:string='-1';
  data:any;
  stars:number=0;
  starsForm:number=0;
  arrayToStars:number[]=[];
  myform!:FormGroup;
  nick!:FormControl;
  body!:FormControl;
  correctDate:boolean=false;
  firstPage:boolean=true;
  constructor(public tripData:TripDataService,private route: ActivatedRoute){}
  public ngOnInit(){
    this.route.params.subscribe(params=>{
      this.index=params['id'];
    })
    this.route.params.subscribe().unsubscribe();
    this.data=this.tripData.tripArray().filter(a=>a.index==this.index)[0];
    console.log(this.data);
    this.stars=(this.data.numberOfOpinion==0? 0:this.data.opinionSum/this.data.numberOfOpinion);

    //form
    this.nick= new FormControl('',[
      Validators.required
    ]);
    this.body=new FormControl('',[
      Validators.required,
      Validators.minLength(50),
      Validators.maxLength(500)
    ]);
    this.myform=new FormGroup({
      nick:this.nick,
      body:this.body,
    });
  }

  public getTripResevation(){
    return this.tripData.reservationDetailMap().get(this.index);
  }

  public getArray(number:number){
    let sizeOfArray=Math.floor(number);
    let array=new Array(sizeOfArray);
    return array.fill(0);
  }

  public starsChange(i:number){
    this.starsForm=i;
  }

  public onSubmit(){
    if(this.myform.valid&&this.starsForm>0){
      let opinonObject=this.myform.value;
      opinonObject['rating']=this.starsForm;
      //dodawnie do bazy danych
      // this.tripData.addOpinion(opinonObject,this.index);
      this.firstPage=true;
      this.correctDate=false;
      this.data.opinions.push(opinonObject);
      this.data.sumOpinion+=this.starsForm;
      this.data.numberOfOpinion+=1;
      this.myform.reset();
      this.starsForm=0;
      console.log('git');
    }else{
      this.correctDate=true;
    }
  }
  public changePage(event:any){
    event.path[3].scrollTo(0,0);
    this.firstPage=!this.firstPage;
    console.log(this.firstPage);
  }
}
