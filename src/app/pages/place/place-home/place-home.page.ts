import { LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { GoogleMapsService } from 'src/app/service/google-maps.service';

@Component({
  selector: 'app-place-home',
  templateUrl: './place-home.page.html',
  styleUrls: ['./place-home.page.scss'],
})
export class PlaceHomePage implements OnInit {

  placeTypes: any;
  places: [] = [];
  constructor(private googleMapsService: GoogleMapsService, public loadingController: LoadingController) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
   // this.getPlaces();
    this.getTypes();
  }


  public async getPlaces() {
    const loading = await this.loadingController.create({
      spinner: 'dots',
      mode: 'ios',
      cssClass: 'spinner',
      animated: true
    });
    await loading.present();
    let places = await this.googleMapsService.getPlaces('500', '');
    console.log(places);
    this.places = places;
    loading.dismiss();
  }

  getTypes() {
    this.googleMapsService.getPlaceTypes().subscribe(types => {
      this.placeTypes = types;
    });

  }

}
