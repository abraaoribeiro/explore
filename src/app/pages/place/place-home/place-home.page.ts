import { Component, OnInit } from '@angular/core';
import { GoogleMapsService } from 'src/app/service/google-maps.service';

@Component({
  selector: 'app-place-home',
  templateUrl: './place-home.page.html',
  styleUrls: ['./place-home.page.scss'],
})
export class PlaceHomePage implements OnInit {

  places: [] = [];
  constructor(private googleMapsService: GoogleMapsService) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.getPlaces();
  }


  public async getPlaces() {
    let places = await this.googleMapsService.getPlaces('500', '');
    console.log(places);
    this.places = places;
  }

}
