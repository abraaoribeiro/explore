import { Injectable, NgZone } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HttpClient } from '@angular/common/http';
declare let google: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {
  private googlePlaces: any;

  constructor(public ngZone: NgZone, private geolocation: Geolocation, private http: HttpClient) {
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
          this.ngZone.run(() => {
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

  public getPlaceTypes() {
    return this.http.get('assets/data/place_type.json');
  }

  public getPlaceCategorys() {
    return this.http.get('assets/data/categorys.json');
  }



}
