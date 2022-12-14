import { NgModule,Component,OnInit,EventEmitter, Output} from '@angular/core';
import { Validator,ReactiveFormsModule,FormControl, FormGroup, Validators } from '@angular/forms';
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { TripDataService } from '../trip-data-service/trip-data.service';
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
  description!:FormControl;
  now=new Date()
  today:string = this.now.getFullYear()+'-'+(this.now.getMonth()+1)+'-'+this.now.getDate();
  constructor(public tripData:TripDataService) {}

  ngOnInit(): void {
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
    this.myform=new FormGroup({
      title:this.title,
      Contry:this.Contry,
      start:this.start,
      end:this.end,
      unitPrice:this.unitPrice,
      maxPlace:this.maxPlace,
      img:this.img,
      description:this.description
    });
  }
  public onSubmit(){
      if(this.myform.valid){
        this.tripData.addToArray(this.myform.value);
        this.close.emit(true);
      }else{
        this.correctDate=true;
        console.log("nie siema");
      }
  }
}