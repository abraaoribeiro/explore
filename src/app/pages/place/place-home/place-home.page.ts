import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { NetworkService } from 'src/app/service/network.service';
import { PlaceService } from 'src/app/service/place.service';
import { PlaceCategoryPage } from '../place-category/place-category.page';

@Component({
  selector: 'app-place-home',
  templateUrl: './place-home.page.html',
  styleUrls: ['./place-home.page.scss'],
})
export class PlaceHomePage implements OnInit {
  networkType: string;
  placeTypes: any;
  places: [] = [];
  constructor(
    private placeService: PlaceService,
    public loadingController: LoadingController,
    public modalController: ModalController,
    private networkService: NetworkService) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.networkService.getNewtwork(this.networkType).then((connction) => {
      this.networkType = connction;
      if (connction != 'none') {
        this.getPlaces();
        this.getTypes();
      }
    })
  }


  public async getPlaces() {
    const loading = await this.loadingController.create({
      spinner: 'dots',
      mode: 'ios',
      cssClass: 'spinner',
      animated: true
    });
    await loading.present();
    let places = await this.placeService.getPlaces('500', '');
    console.log(places);
    this.places = places;
    loading.dismiss();
  }

  getTypes() {
    this.placeService.getPlaceTypes().subscribe(types => this.placeTypes = types);
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: PlaceCategoryPage,
      componentProps: { type: this.getPlaces },
      mode: 'ios',
      cssClass: 'modal-action-sheet',

    });
    await modal.present();
  }


}
