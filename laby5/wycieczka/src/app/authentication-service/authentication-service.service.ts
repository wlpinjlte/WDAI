import { Injectable } from '@angular/core';
import { TripDataService } from '../trip-data-service/trip-data.service';
import {Auth,signInWithEmailAndPassword,signOut,createUserWithEmailAndPassword} from '@angular/fire/auth';
import { Observable} from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {AngularFireDatabase} from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {
  array!:any[];
  trips?:Observable<unknown[]>;
  dataFireBase:any;
  isLogIn:boolean=false;
  idUser?='';
  userInfo:any;
  userStatus:string='gosc';
  userFireBaseReservation:any;
  userFireBaseBought:any;
  allOfReservation=0;
  numberOfReservationMap=new Map();
  constructor(public auth:Auth,public angularFireAuth: AngularFireAuth,public dataa:AngularFireDatabase,public router:Router) {
    this.dataFireBase=dataa.list('/users');
    this.trips= dataa.list('/users').valueChanges();
    angularFireAuth.authState.subscribe(res=>{
      console.log(res);
      this.isLogIn=(res && res.uid)? true:false;
      if(this.isLogIn){
        this.idUser=res?.uid;
        this.downloadInfrmation();
      }
    });
  }

  public downloadInfrmation(){
    this.trips?.subscribe(res=>{
      console.log(res);
      let temp:any[]=res;
      this.userInfo=temp.filter(a=>a.Userid==this.idUser)[0];
      this.userStatus=this.userInfo.role;
      this.userFireBaseReservation=this.dataa.list('/users/'+this.userInfo.index+'/reservation');
      this.userFireBaseBought=this.dataa.list('/users/'+this.userInfo.index+'/bought');
      this.allOfReservation=0;
      this.numberOfReservationMap.clear();
      this.getResevationArray().forEach(a=>{
        this.allOfReservation+=a.quantity;
        this.numberOfReservationMap.set(a.index,a.quantity);
      })
      console.log(this.userInfo);
      console.log(this.numberOfReservationMap);
    });
  }

  public creatAccount(email:string,password:string){
    createUserWithEmailAndPassword(this.auth,email,password)
    .then((res)=>{
      console.log(res);
      let index=this.dataFireBase.push()
      index.set({'role':'user','Userid':res.user.uid,'reservation':{'0':{'index':'-1'}},'bought':{'0':{'index':'-1'}},'index':index.key});
      this.router.navigate(['/main-page']);
    })
    .catch(err=>{
      alert(err.message);
    });
  }

  public logIn(email:string,password:string){
    signInWithEmailAndPassword(this.auth,email,password)
    .then((res)=>{
      console.log(res);
      this.router.navigate(['/main-page']);
    })
    .catch(err=>{
      alert(err.message);
    });
  }

  public logOut(){
    this.userStatus='gosc';
    this.userInfo=[];
    this.idUser='';
    signOut(this.auth);
  }

  public adminPermition(){
    if(this.userStatus=='admin'){
      return true;
    }
    return false;
  }

  public managerPermition(){
    if(this.userStatus=='manager'){
      return true;
    }
    return false;
  }

  public userPermition(){
    if(this.userStatus=='user'){
      return true;
    }
    return false;
  }

  public addReservation(index:string){
    console.log(this.userInfo.reservation);
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
      referance.set({'index':index,'quantity':quantity,'id':referance.key});
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
    console.log(reservationArray,index);
    this.userFireBaseReservation.remove(tripToReservation[0].id);
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
    let array=Object.values(this.userInfo.bought);
    array.shift();
    let boughtArray:any[]=this.isLogIn? array:[];
    return boughtArray;
  }
  public setPersistence(persistence:string){
    this.angularFireAuth.setPersistence('local')
    .then((res:any)=>console.log(res))
    .catch((err:any)=>console.log(err));
  }
}
