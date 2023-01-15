import { NgModule,Component,OnInit,EventEmitter, Output} from '@angular/core';
import { Validator,ReactiveFormsModule,FormControl, FormGroup, Validators } from '@angular/forms';
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { TripDataService } from '../trip-data-service/trip-data.service';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.css','../../assets/bootstrap/bootstrap.min.css']
})

export class TripFormComponent implements OnInit{
  correctDate=false;
  myform!:FormGroup;
  title!:FormControl;
  Contry!:FormControl;
  start!:FormControl;
  end!:FormControl;
  unitPrice!:FormControl;
  maxPlace!:FormControl;
  img!:FormControl;
  imgCarousel!:FormControl;
  description!:FormControl;
  now=new Date()
  today:string = this.now.getFullYear()+'-'+((this.now.getMonth()+1)>9?(this.now.getMonth()+1):'0'+(this.now.getMonth()+1))+'-'+(this.now.getDate()>9?this.now.getDate():"0"+this.now.getDate());
  isUpdate:boolean=false;
  index:string='';
  constructor(public tripData:TripDataService,public router:Router) {}

  ngOnInit(): void {
    this.title= new FormControl('',[
      Validators.required,
      Validators.pattern("\([0-z]+[ ]?\)+")
    ]);
    this.Contry=new FormControl('',[
      Validators.required,
      Validators.pattern("[A-z]+")
    ]);
    this.start=new FormControl('',[
      Validators.required
    ]);
    this.end=new FormControl('',[
      Validators.required
    ]);
    this.unitPrice=new FormControl('',[
      Validators.required,
      Validators.pattern("\\d+")
    ]);
    this.maxPlace=new FormControl('',[
      Validators.required,
      Validators.pattern("\\d+")
    ]);
    this.img=new FormControl('',[
      Validators.required
    ]);
    this.description=new FormControl('',[
      Validators.required
    ]);
    this.imgCarousel=new FormControl('',[
      Validators.required
    ])
    this.myform=new FormGroup({
      title:this.title,
      Contry:this.Contry,
      start:this.start,
      end:this.end,
      unitPrice:this.unitPrice,
      maxPlace:this.maxPlace,
      img:this.img,
      description:this.description,
      imgCarousel:this.imgCarousel
    });
    this.loadContent();
  }

  public loadContent(){
    if(this.tripData.tripToEdit!=''){
      this.isUpdate=true;
      let trip=this.tripData.tripArray().filter(a=>a.index==this.tripData.tripToEdit)[0];
      this.index=this.tripData.tripToEdit
      this.myform.patchValue({
        title:trip.title,
        Contry:trip.Contry,
        start: formatDate(trip.start,'yyyy-MM-dd', 'en'),
        end: formatDate(trip.end,'yyyy-MM-dd', 'en'),
        unitPrice:trip.unitPrice,
        maxPlace:trip.maxPlace,
        img:trip.img,
        description:trip.description,
        imgCarousel:trip.imgCarousel.reduce((a:any,b:any)=>a+" "+b)
      });
    }
    this.tripData.tripToEdit='';
  }

  public onSubmit(){
      if(this.myform.valid){
        if(this.isUpdate){
          this.tripData.updateTrip(this.index,this.myform.value);
        }else{
          this.tripData.addToArray(this.myform.value);
        }
        this.router.navigate(['/trip-list']);
      }else{
        this.correctDate=true;
      }
  }
}