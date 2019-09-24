import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, PopoverController } from '@ionic/angular';
import { PlaceService } from 'src/app/service/place.service';
import { PopoverFilterComponent } from './../../../shared/components/popover-filter/popover-filter.component';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.page.html',
  styleUrls: ['./place-list.page.scss'],
})
export class PlaceListPage implements OnInit {

  places = []
  type: string = ''
  typeName: string = '';
  range: any = '500';
  constructor(private placeService: PlaceService,
    private route: ActivatedRoute,
    public loadingController: LoadingController,
    public popoverController: PopoverController) { }

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
        this.type = params.category
        if(params.range){
          this.range = params.range
        }
    });
    try {
      let place = await this.placeService.getPlaces(this.range, this.type);
      console.log(place);
      this.places = place;
      loading.dismiss();
    } catch (error) {
      loading.dismiss();
    }

  }

  public async openPopoverFiler() {
    const popover = await this.popoverController.create({
      component: PopoverFilterComponent,
      mode: 'ios',
      animated: true
    })
    await popover.present();
    const data = await popover.onDidDismiss()
    this.getPlaces();
  }
}
