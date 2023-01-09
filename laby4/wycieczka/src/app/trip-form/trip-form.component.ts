import { NgModule,Component,OnInit,EventEmitter, Output} from '@angular/core';
import { Validator,ReactiveFormsModule,FormControl, FormGroup, Validators } from '@angular/forms';
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { TripDataService } from '../trip-data-service/trip-data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.css','../../assets/bootstrap/bootstrap.min.css']
})

export class TripFormComponent implements OnInit{
  @Output() close=new EventEmitter<boolean>();
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
  constructor(public tripData:TripDataService,public router:Router) {}

  ngOnInit(): void {
    console.log(this.today);
    this.title= new FormControl('',[
      Validators.required,
      Validators.pattern("\([A-z]+[ ]?\)+")
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
  }
  public onSubmit(){
      if(this.myform.valid){
        this.tripData.addToArray(this.myform.value);
        // this.close.emit(true);
        this.router.navigate(['/trip-list']);
      }else{
        this.correctDate=true;
        console.log("nie siema");
      }
  }
}