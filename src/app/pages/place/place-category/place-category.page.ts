import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { PlaceService } from 'src/app/service/place.service';

@Component({
  selector: 'app-place-category',
  templateUrl: './place-category.page.html',
  styleUrls: ['./place-category.page.scss'],
})
export class PlaceCategoryPage implements OnInit {
  categorys: any;
  footerHidden: boolean = false;

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

  buttonBack() {
    this.router.navigate(['tabs/tab1']);
  }

  onScroll(event) {
    if (event.detail.deltaY > 0 && this.footerHidden) return;
    if (event.detail.deltaY < 0 && !this.footerHidden) return;
    if (event.detail.deltaY > 0) {
      this.footerHidden = true;
    } else {
      this.footerHidden = false;
    };
  }
}