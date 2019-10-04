import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { Guide } from 'src/app/model/guide';
import { GuideService } from 'src/app/service/guide.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-guide-list',
  templateUrl: './guide-list.page.html',
  styleUrls: ['./guide-list.page.scss'],
})
export class GuideListPage implements OnInit {
  public img = "https://picsum.photos/1000/800/?random";
  public guides = new Array<Guide>();
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private router: Router, private guideService: GuideService) { }

  ngOnInit() {
    this.guideService.list().pipe(takeUntil(this.destroy$)).subscribe(guides => {
      this.guides = guides;
      console.log(guides);
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();

  }

  routerAddGuide() {
    this.router.navigate(['/guide-edit']);
  }

}
