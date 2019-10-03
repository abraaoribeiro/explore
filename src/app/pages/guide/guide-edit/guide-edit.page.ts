import { ActivatedRoute } from '@angular/router';
import { FeedbackService } from './../../../service/feedback.service';
import { Component, OnInit } from '@angular/core';
import { GuideService } from 'src/app/service/guide.service';
import { Guide } from 'src/app/model/guide';
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
    private route: ActivatedRoute) { }

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


}
