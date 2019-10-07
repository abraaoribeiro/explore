import { Component, OnInit, Input } from '@angular/core';
import { Guide } from 'src/app/model/guide';

@Component({
  selector: 'app-guide-select-card',
  templateUrl: './guide-select-card.page.html',
  styleUrls: ['./guide-select-card.page.scss'],
})
export class GuideSelectCardPage implements OnInit {

  @Input() title: string;
  @Input() date: Date;
  @Input() timeStart: Date;
  @Input() timeEnd: Date;

  constructor() { }

  ngOnInit() {
  }

}
