import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';


@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {

  constructor(private geolocation: Geolocation) {}


  public async getPosition(){
    let myLatLog:string;
    const curretPosition = this.geolocation.getCurrentPosition();
    
  }
}
