import { LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PlaceService } from 'src/app/service/place.service';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.page.html',
  styleUrls: ['./place-list.page.scss'],
})
export class PlaceListPage implements OnInit {

  places = []
  type: any = ''
  typeName: string;
  range: any = '500';
  constructor(private placeService: PlaceService,
    private route: ActivatedRoute,
    public loadingController: LoadingController) { }

  ngOnInit() {
    this.getPlaces();
  }


  async getPlaces() {
    const loading = await this.loadingController.create({
      spinner: 'dots',
      mode: 'ios',
      cssClass: 'spinner',
      animated: true
    })
    await loading.present();
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.typeName = params.name
      this.type = params.category});
    let place = await this.placeService.getPlaces(this.range, this.type);
    console.log(place);
    this.places = place;
    loading.dismiss();

  }
}
