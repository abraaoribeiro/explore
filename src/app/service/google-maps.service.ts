import { Injectable, NgZone } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
declare let google: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {
  googlePlaces: any;
  constructor(public zone: NgZone, private geolocation: Geolocation) {
    let elem = document.createElement("div");
    this.googlePlaces = new google.maps.places.PlacesService(elem);
  }


  private async getPosition(radius: any, type: any): Promise<any> {
    let myLatLog: string;
    const currentPosition = await this.geolocation.getCurrentPosition();
    myLatLog = new google.maps.LatLng(currentPosition.coords.latitude, currentPosition.coords.longitude, currentPosition.coords.accuracy)
    return myLatLog;
  }


  public async getPlaces(radius?: any, type?: any): Promise<any> {
    const userLocation = await this.getPosition(radius, type);
    return new Promise((resolve) => {
      this.googlePlaces.nearbySearch({
        location: userLocation,
        radius: radius,
        type: type,
        laguages: "pt-BR"
      }, (result, status, pagination) => {
        let places = [];
        if (status === "OK") {
          this.zone.run(() => {
            for (let i = 0; i < result.length; i++) {
              places.push(result[i]);
            }
            resolve(places);
          });
        }
        resolve();
      });
    });
  }


}
