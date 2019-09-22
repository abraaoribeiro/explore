import { LoadingController } from '@ionic/angular';
import { GoogleMapsService } from 'src/app/service/google-maps.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {

  place: any;
  shownGroup = null;

  constructor(private googleMapsService: GoogleMapsService,
    public loadingController: LoadingController,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.getPlaceDetail()
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
    await this.googleMapsService.getPlaceDetail('', place_id).then(placeDetail => {
      console.log(placeDetail);
      this.place = placeDetail;
      loading.dismiss();
    })
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
}
