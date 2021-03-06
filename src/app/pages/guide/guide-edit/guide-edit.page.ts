import { LoadingController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Guide } from 'src/app/model/guide';
import { GuideService } from 'src/app/service/guide.service';
import { FeedbackService } from './../../../service/feedback.service';
@Component({
  selector: 'app-guide-edit',
  templateUrl: './guide-edit.page.html',
  styleUrls: ['./guide-edit.page.scss'],
  providers: [DatePipe]
})
export class GuideEditPage implements OnInit {
  guide: Guide = new Guide();
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private guideService: GuideService,
    private feedbackService: FeedbackService,
    private route: ActivatedRoute,
    private router: Router,
    public loadingController: LoadingController,
    private datePicker: DatePicker) { }

  ngOnInit() { }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }



  ionViewDidEnter() {
    this.findOneGuide();
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.guide.place = params.place;
      this.guide.reference = params.reference;
      console.log(params);
      
      if (params.rating) {
        this.guide.rating = params.rating;
      }
    });
  }

  public async findOneGuide() {
    const loading = await this.loadingController.create({
      spinner: 'dots',
      mode: 'ios',
      cssClass: 'spinner',
      animated: true
    });
    let id = this.route.snapshot.params['id'];
    if (id) {
      await loading.present();
      this.guideService.findOne(id).pipe(takeUntil(this.destroy$))
        .subscribe(guide => {
          guide.date = this.guideService.formatDateFirestore(guide.date);
          guide.timeStart = this.guideService.formatDateFirestore(guide.timeStart);
          guide.timeEnd = this.guideService.formatDateFirestore(guide.timeEnd);
          this.guide = guide;
          loading.dismiss();
        });
    }
  }

  async createGuide() {
    if (this.guide.id) {
      await this.guideService.update(this.guide);
      this.feedbackService.localNotification('Lembre-se de seu próximo local de visita', this.guide.img, this.guide.timeEnd);
      this.feedbackService.presentToastWithOptions('Roteiro atualizado com sucesso', "success");
      this.router.navigate(['/tabs/tab3']);
    } else {

      await this.guideService.create(this.guide);
      this.feedbackService.localNotification('Lembre-se de seu próximo local de visita', this.guide.img, this.guide.timeEnd);
      this.feedbackService.presentToastWithOptions('Roteiro criado com sucesso', "success");
      this.router.navigate(['/tabs/tab3']);
    }
  }



  getDate() {
    this.datePicker.show({
      date: new Date,
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then(date => this.guide.date = date);
  }

  getTimeStart() {
    this.datePicker.show({
      date: new Date,
      mode: 'time',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then(time => this.guide.timeStart = time);
  }

  getTimeEnd() {
    this.datePicker.show({
      date: new Date,
      mode: 'time',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then(time => this.guide.timeEnd = time);
  }

  getImagens(imagens: any): string {
    let url: string;
    if (imagens) {
      imagens.forEach(image => {
        url = image.getUrl();
        return
      });
    }
    return url;
  }

}
