import { GuideService } from 'src/app/service/guide.service';
import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';
import { Guide } from 'src/app/model/guide';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guide-select-card',
  templateUrl: './guide-select-card.page.html',
  styleUrls: ['./guide-select-card.page.scss'],
})
export class GuideSelectCardPage implements OnInit {

  @Input() id: any;
  @Input() title: string;
  @Input() date: Date;
  @Input() timeStart: Date;
  @Input() timeEnd: Date;
  @Input() reference: string;

  constructor(private router: Router, public modalController: ModalController, private guideService: GuideService) { }

  ngOnInit() { }

  ionViewDidEnter() {}

  public routerNavegationDetail() {
    this.router.navigate(['/place-detail', this.reference]);
    this.modalController.dismiss();
  }

  public deleteGuide() {
    this.guideService.delete(this.id);
    this.modalController.dismiss();
  }

  public routerUpdateGuide() {
    this.router.navigate(['/guide-edit', this.id]);
    this.modalController.dismiss();
  }


}
