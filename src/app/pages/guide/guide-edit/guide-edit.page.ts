import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { Guide } from 'src/app/model/guide';
import { GuideService } from 'src/app/service/guide.service';
import { FeedbackService } from './../../../service/feedback.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
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
    private datePipe: DatePipe,
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
      this.guide.rating = params.rating
    });
  }

  findOneGuide() {
    let id = this.route.snapshot.params['id'];
    if (id) {
      this.guideService.findOne(id).pipe(takeUntil(this.destroy$))
        .subscribe(guide => {
          guide.date = this.guideService.formatDateFirestore(guide.date);
          guide.timeStart = this.guideService.formatDateFirestore(guide.timeStart);
          guide.timeEnd = this.guideService.formatDateFirestore(guide.timeEnd);
          this.guide = guide;

        });
    }
  }

  async createGuide() {
    if (this.guide.id) {
      this.datePipe.transform(this.guide.date, 'dd-MM-yyyy');
      await this.guideService.update(this.guide);
      this.feedbackService.localNotification('Lembre-se de seu próximo local de visita', this.guide.date);
      this.feedbackService.presentToastWithOptions('Roteiro atualizado com sucesso');
      this.router.navigate(['/tabs/tab3']);
    } else {
      await this.guideService.create(this.guide);
      this.feedbackService.localNotification('Lembre-se de seu próximo local de visita', this.guide.date);
      this.feedbackService.presentToastWithOptions('Roteiro criado com sucesso');
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

}
