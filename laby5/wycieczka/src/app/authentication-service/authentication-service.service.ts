import { Injectable } from '@angular/core';
import { TripDataService } from '../trip-data-service/trip-data.service';
import {Auth,signInWithEmailAndPassword,signOut,createUserWithEmailAndPassword} from '@angular/fire/auth';
import { BehaviorSubject, Observable} from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {AngularFireDatabase} from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {
  array!:any[];
  userDetails?:Observable<unknown[]>;
  dataFireBase:any;
  isLogIn:boolean=false;
  idUser?='';
  userInfo:any;
  userStatus:any={admin:false,manager:false,user:false,banned:false};
  userFireBaseReservation:any;
  userFireBaseBought:any;
  allOfReservation=0;
  numberOfReservationMap=new Map();
  persistence:string='local';
  isDateToTrips:BehaviorSubject<boolean>;
  usersArray!:any[];

  constructor(public auth:Auth,public angularFireAuth: AngularFireAuth,public dataa:AngularFireDatabase,public router:Router) {
    this.isDateToTrips=new BehaviorSubject<boolean>(false);
    this.dataFireBase=dataa.list('/users');
    this.userDetails= dataa.list('/users').valueChanges();

    dataa.list('/stan').valueChanges().subscribe((res:any)=>{
      this.persistence=res[0];
    })

    angularFireAuth.authState.subscribe(res=>{
      this.isLogIn=(res && res.uid)? true:false;
      if(this.isLogIn){
        this.idUser=res?.uid;
        this.downloadInfrmation();
      }
    });
  }

  public downloadInfrmation(){
    this.userDetails?.subscribe(res=>{
      this.usersArray=res;
      console.log(this.usersArray);
      this.userInfo=this.usersArray.filter(a=>a.Userid==this.idUser)[0];
      this.userStatus=this.userInfo.role;

      this.userFireBaseReservation=this.dataa.list('/users/'+this.userInfo.index+'/reservation');
      this.userFireBaseBought=this.dataa.list('/users/'+this.userInfo.index+'/bought');

      this.allOfReservation=0;
      this.numberOfReservationMap.clear();
      this.getResevationArray().forEach(a=>{
        this.allOfReservation+=a.quantity;
        this.numberOfReservationMap.set(a.index,a.quantity);
      })

      this.isDateToTrips.next(true);
    });
  }
  
  public creatAccount(email:string,password:string){
    this.angularFireAuth.setPersistence(this.persistence)
    .then(()=>{
      createUserWithEmailAndPassword(this.auth,email,password)
      .then((res)=>{
        console.log(res);
        let index=this.dataFireBase.push()
        index.set({'role':{'user':true,'admin':false,'manager':false,'banned':false},'Userid':res.user.uid,'reservation':{'0':{'index':'-1'}},'bought':{'0':{'index':'-1'}},'index':index.key,'name':email});
        this.router.navigate(['/main-page']);
      })
      .catch(err=>{
        alert(err.message);
      });
    })
    .catch(err=>{
      alert(err.message);
    });
  }

  public logIn(email:string,password:string){
    this.angularFireAuth.setPersistence(this.persistence)
    .then(()=>{
      signInWithEmailAndPassword(this.auth,email,password)
      .then((res)=>{
        console.log(res);
        this.router.navigate(['/main-page']);
      })
      .catch(err=>{
        alert(err.message);
      });
    })
  }

  public logOut(){
    this.userStatus={admin:false,manager:false,user:false,banned:false};
    this.userInfo=[];
    this.idUser='';
    signOut(this.auth);
    this.router.navigate(['/main-page']);
  }

  public adminPermition(){
    if(this.userStatus.admin==true){
      return true;
    }
    return false;
  }

  public managerPermition(){
    if(this.userStatus.manager==true){
      return true;
    }
    return false;
  }

  public userPermition(){
    if(this.userStatus.user==true){
      return true;
    }
    return false;
  }

  public addReservation(index:string){
    let reservationArray:any[]=this.getResevationArray();
    let tripToReservation=reservationArray.filter(a=>a.index==index);

    if(tripToReservation.length>0){
      this.userFireBaseReservation.update(tripToReservation[0].id,{'quantity':tripToReservation[0].quantity+1});
    }else{
      let referance=this.userFireBaseReservation.push();
      referance.set({'index':index,'quantity':1,'id':referance.key})
    }
  }

  public addBought(index:string){
    let quantity=this.numberOfResevation(index);
    this.removeAllReservation(index);
    let boughtArray:any[]=this.getBoughtArray();
    let tripToBought=boughtArray.filter(a=>a.index==index)

    if(tripToBought.length>0){
      this.userFireBaseBought.update(tripToBought[0].id,{'quantity':tripToBought[0].quantity+quantity});
    }else{
      let referance=this.userFireBaseBought.push();
      referance.set({'index':index,'quantity':quantity,'id':referance.key,'isRated':false});
    }
  }

  public removeReservation(index:string){
    let reservationArray:any[]=this.getResevationArray();
    let tripToReservation=reservationArray.filter(a=>a.index==index);
    
    if(tripToReservation[0].quantity==1){
      this.userFireBaseReservation.remove(tripToReservation[0].id);
    }else{
      this.userFireBaseReservation.update(tripToReservation[0].id,{'quantity':tripToReservation[0].quantity-1});
    }
  }

  public removeAllReservation(index:string){
    let reservationArray:any[]=this.getResevationArray();
    let tripToReservation=reservationArray.filter(a=>a.index==index);
    console.log(tripToReservation);
    if(tripToReservation.length>0){
      this.userFireBaseReservation.remove(tripToReservation[0].id);
    } 
  }

  public numberOfResevation(index:string){
    return this.numberOfReservationMap.has(index)? this.numberOfReservationMap.get(index):0;
  }

  public getResevationArray(){
    let array=Object.values(this.userInfo.reservation);
    array.shift();
    let reservationArray:any[]=this.isLogIn? array:[];
    return reservationArray;
  }

  public getBoughtArray(){
    if(this.userInfo==undefined){
      return [];
    }
    let array=Object.values(this.userInfo.bought);
    array.shift();
    let boughtArray:any[]=this.isLogIn? array:[];
    return boughtArray;
  }

  public setPersistence(persistence:string){
    this.dataa.list('/stan').set('persistence',persistence);
  }

  public changeRole(roleToChange:string,valuesToChange:boolean,indexOfUser:string){
    this.dataa.list('/users/'+indexOfUser+'/role').set(roleToChange,valuesToChange);
  }

  public opinionRequirements(index:string){
    let boughtArray=this.getBoughtArray();
    let tripToOpinion=boughtArray.filter(a=>a.index==index)
    if(tripToOpinion.length>0){
      if(tripToOpinion[0].isRated==false){
        return true;
      }
    }
    return false;
  }
  public changeIsRated(index:string){
    let boughtArray=this.getBoughtArray();
    let tripIsRatingToChange=boughtArray.filter(a=>a.index==index)
    if(tripIsRatingToChange.length>0){
      this.dataa.list('/users/'+this.userInfo.index+'/bought/').update(tripIsRatingToChange[0].id,{'isRated':true});
    }
  }
}
