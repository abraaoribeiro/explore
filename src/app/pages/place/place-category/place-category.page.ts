import { GoogleMapsService } from 'src/app/service/google-maps.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-place-category',
  templateUrl: './place-category.page.html',
  styleUrls: ['./place-category.page.scss'],
})
export class PlaceCategoryPage implements OnInit {
  categorys: any ;
  constructor(
    public loadingController: LoadingController,
    public modalController: ModalController,
    private googleMapsService: GoogleMapsService) { }

  ngOnInit() {
    this.placeCategory();
  }

  closeModal() {
    this.modalController.dismiss();
  }

  public async placeCategory() {
    const loading = await this.loadingController.create({
      spinner: 'dots',
      mode: 'ios',
      cssClass: 'spinner',
      animated: true
    })
    await loading.present();
    await this.googleMapsService.getPlaceCategorys().subscribe(categorys => {
      this.categorys = categorys
      loading.dismiss();
    });
  }
  search(){
    this.categorys
  }
}
