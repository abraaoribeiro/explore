import { ActivatedRoute } from '@angular/router';
import { FeedbackService } from './../../../service/feedback.service';
import { Component, OnInit } from '@angular/core';
import { GuideService } from 'src/app/service/guide.service';
import { Guide } from 'src/app/model/guide';
import { DatePicker } from '@ionic-native/date-picker/ngx';
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
    })
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
    }).then(res => this.guide.date = res);
  }
}
