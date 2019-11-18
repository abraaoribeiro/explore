import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { GuideService } from 'src/app/service/guide.service';
import { NetworkService } from 'src/app/service/network.service';
import { PlaceService } from 'src/app/service/place.service';
import { PlaceCategoryPage } from '../place-category/place-category.page';
import { Guide } from 'src/app/model/guide';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-place-home',
  templateUrl: './place-home.page.html',
  styleUrls: ['./place-home.page.scss'],
})
export class PlaceHomePage implements OnInit {
  networkType: string;
  placeTypes: any;
  places: [] = [];
  erroNotGoogleApi: any;
  guides: Guide[];
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private placeService: PlaceService,
    public loadingController: LoadingController,
    public modalController: ModalController,
    private networkService: NetworkService,
    private router: Router,
    private guideService: GuideService) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.networkService.getNewtwork(this.networkType).then((connction) => {
      this.networkType = connction;
      if (connction != 'none') {
        this.getPlaces();
        this.getTypes();
        this.getGuides();
      }
    })
  }

  getGuides() {
    this.guideService.list().pipe(takeUntil(this.destroy$)).subscribe(guides => {
      this.guides = guides;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  public async getPlaces() {
    const loading = await this.loadingController.create({
      spinner: 'dots',
      mode: 'ios',
      cssClass: 'spinner',
      animated: true
    });
    await loading.present();
    await this.placeService.getPlaces('500', '').then(places => {
      this.places = places;
      console.log(places);
      loading.dismiss();
    }).catch(err => {
      this.erroNotGoogleApi = err;
      loading.dismiss();
    });
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

  routeCategory() {
    this.router.navigate(['/place-category']);
  }

  routerNewGuide(){
    this.router.navigate(['/guide-edit']);
  }
}
