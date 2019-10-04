import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { Guide } from 'src/app/model/guide';
import { GuideService } from 'src/app/service/guide.service';
import { FeedbackService } from './../../../service/feedback.service';
@Component({
  selector: 'app-guide-edit',
  templateUrl: './guide-edit.page.html',
  styleUrls: ['./guide-edit.page.scss'],
})
export class GuideEditPage implements OnInit {
  guide: Guide = new Guide();
  constructor(
    private guideService: GuideService,
    private feedbackService: FeedbackService,
    private route: ActivatedRoute,
    private datePicker: DatePicker) { }

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.guide.place = params.place;
      this.guide.rating = params.rating;
      this.guide.reference = params.reference;
    });
  }


  createGuide() {
    this.guideService.create(this.guide);
    this.feedbackService.presentToastWithOptions('Roteiro criado com sucesso');
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
