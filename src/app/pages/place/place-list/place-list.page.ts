import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, PopoverController } from '@ionic/angular';
import { PlaceService } from 'src/app/service/place.service';
import { PopoverFilterComponent } from './../../../shared/components/popover-filter/popover-filter.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.page.html',
  styleUrls: ['./place-list.page.scss'],
})
export class PlaceListPage implements OnInit {

  places = []
  type: string = ''
  typeName: string = '';
  range: any = '200';
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private placeService: PlaceService,
    private route: ActivatedRoute,
    public loadingController: LoadingController,
    public popoverController: PopoverController) { }

  ngOnInit() {
    this.getPlaces();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  async getPlaces() {
    const loading = await this.loadingController.create({
      spinner: 'dots',
      mode: 'ios',
      cssClass: 'spinner',
      animated: true
    })
    await loading.present();
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.typeName = params.name
      this.type = params.category
      if (params.range) {
        this.range = params.range
      }
    });
    let place = await this.placeService.getPlaces(this.range, this.type);
    this.places = place;
    loading.dismiss();
  }

  public async openPopoverFiler() {
    const popover = await this.popoverController.create({
      component: PopoverFilterComponent,
      componentProps: {
        'category': this.type,
        'range': this.range,
        'name': this.typeName
      },
      mode: 'ios',
      animated: true,
      cssClass: 'stylePopover'
    })
    await popover.present();
    const data = await popover.onDidDismiss();
    if (data.data == 'verifid') {
      this.getPlaces();
    }
  }
}
