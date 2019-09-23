import { PlaceService } from 'src/app/service/place.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-place-category',
  templateUrl: './place-category.page.html',
  styleUrls: ['./place-category.page.scss'],
})
export class PlaceCategoryPage implements OnInit {
  categorys: any ;
  constructor(
    public loadingController: LoadingController,
    private placeService: PlaceService,
    private router: Router) { }

  ngOnInit() {
    this.placeCategory();
  }

  public async placeCategory() {
    const loading = await this.loadingController.create({
      spinner: 'dots',
      mode: 'ios',
      cssClass: 'spinner',
      animated: true
    })
    await loading.present();
    await this.placeService.getPlaceCategorys().subscribe(categorys => {
      this.categorys = categorys
      loading.dismiss();
    });
  }
  search(){
    this.categorys
  }

  buttonBack(){
    this.router.navigate(['tabs/tab1']);
  }
}
