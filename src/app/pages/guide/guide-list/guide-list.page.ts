import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guide-list',
  templateUrl: './guide-list.page.html',
  styleUrls: ['./guide-list.page.scss'],
})
export class GuideListPage implements OnInit {
  img = "https://picsum.photos/1000/800/?random"
  constructor() { }

  ngOnInit() {
  }

}
