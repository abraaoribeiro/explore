import { FavoriteService } from './../../../service/favorite.service';
import { LoadingController } from '@ionic/angular';
import { PlaceService } from 'src/app/service/place.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { GuideService } from 'src/app/service/guide.service';
const Share = Plugins.Share;
@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {

  place: any;
  shownGroup = null;
  defaultImage = 'assets/img/undraw_empty_xct9.svg'
  likeState: string;
  iconName: string;
  constructor(private placeService: PlaceService,
    public loadingController: LoadingController,
    private route: ActivatedRoute,
    private router: Router,
    private favoriteService: FavoriteService
  ) { }

  ngOnInit() {
    this.getPlaceDetail();
  }

  addNewGuide() {
    try {
      let reference = this.route.snapshot.params['id'];
      this.router.navigate(['/guide-edit'], { queryParams: { 'place': this.place.name, 'reference': reference }, queryParamsHandling: 'merge' });
    } catch (error) {

    }
  }

  list() {
    this.favoriteService.list().subscribe(res => {
      res.forEach(favorite => {
        console.log(this.place.name);
        if (favorite.name) {
          if (this.place.name == favorite.name) {
            this.likeState = 'liked';
            this.iconName = 'heart';
          }
        }
      })
    })
  }


  public async getPlaceDetail() {
    let loading = await this.loadingController.create({
      spinner: 'dots',
      mode: 'ios',
      cssClass: 'spinner',
      animated: true
    });
    await loading.present();
    let place_id = this.route.snapshot.params['id'];
    try {
      await this.placeService.getPlaceDetail('', place_id).then(placeDetail => {
        this.list()
        this.place = placeDetail;
        console.log(this.place);

        loading.dismiss();
      }).catch(err => loading.dismiss())

    } catch (error) {

    }

  }

  public toggleGroup(group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  };
  public isGroupShown(group) {
    return this.shownGroup === group;
  };

  buttonBack() {
    this.router.navigateByUrl('/tabs/tab1')
  }

  async  shared() {
    await Share.share({
      url: this.place.url,
      dialogTitle: 'Compartilhar',
    })
  }
}
