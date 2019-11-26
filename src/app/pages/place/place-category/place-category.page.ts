import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { PlaceService } from 'src/app/service/place.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-place-category',
  templateUrl: './place-category.page.html',
  styleUrls: ['./place-category.page.scss'],
})
export class PlaceCategoryPage implements OnInit {
  categorys: any;
  footerHidden: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public loadingController: LoadingController,
    private placeService: PlaceService,
    private router: Router) { }

  ngOnInit() {
    this.placeCategory();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  
  public async placeCategory() {
    const loading = await this.loadingController.create({
      spinner: 'dots',
      mode: 'ios',
      cssClass: 'spinner',
      animated: true
    })
    await loading.present();
    await this.placeService.getPlaceCategorys().pipe(takeUntil(this.destroy$)).subscribe(categorys => {
      this.categorys = categorys
      loading.dismiss();
    });
  }

  buttonBack() {
    this.router.navigate(['tabs/tab1']);
  }

  onScroll(event) {
    if (event.detail.deltaY > 0) {
      this.footerHidden = true;
    } else {
      this.footerHidden = false;
    };
  }
}