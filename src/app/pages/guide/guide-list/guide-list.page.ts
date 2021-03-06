import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, LoadingController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Guide } from 'src/app/model/guide';
import { GuideService } from 'src/app/service/guide.service';
import { GuideSelectCardPage } from '../guide-select-card/guide-select-card.page';

@Component({
  selector: 'app-guide-list',
  templateUrl: './guide-list.page.html',
  styleUrls: ['./guide-list.page.scss'],
})
export class GuideListPage implements OnInit {
  public img = "https://picsum.photos/1000/800/?random";
  public guides = new Array<Guide>();
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public router: Router,
    public guideService: GuideService,
    public modalController: ModalController,
    public loadingController: LoadingController) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
  this.findAllGuide();
   }

  public async findAllGuide() {
    const loading = await this.loadingController.create({
      spinner: 'dots',
      mode: 'ios',
      cssClass: 'spinner',
      animated: true
    });
    await loading.present();
    this.guideService.list().pipe(takeUntil(this.destroy$)).subscribe(guides => {
      this.guides = guides;
      loading.dismiss();
    });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public routerAddGuide() { this.router.navigate(['/guide-edit']) }

  public async openSelectCardGuide(guide: Guide) {
    const modal = await this.modalController.create({
      component: GuideSelectCardPage,
      componentProps: {
        'id': guide.id,
        'title': guide.title,
        'date': guide.date,
        'timeStart': guide.timeStart,
        'timeEnd': guide.timeEnd,
        'reference': guide.reference
      },
      cssClass: 'modal-select-guide'
    });
    await modal.present();
  }

}
