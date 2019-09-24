import { intersectionObserverPreset, LazyLoadImageModule } from 'ng-lazyload-image';
import { AnimatedFavoriteModule } from './../../../shared/components/animated-favorite/animated-favorite.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PlaceDetailPage } from './place-detail.page';
import { CardPlaceModule } from 'src/app/shared/components/card-place/card-place.module';

const routes: Routes = [
  {
    path: '',
    component: PlaceDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardPlaceModule,
    LazyLoadImageModule.forRoot({
      preset: intersectionObserverPreset // <-- tell LazyLoadImage that you want to use IntersectionObserver
    }),
    AnimatedFavoriteModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PlaceDetailPage]
})
export class PlaceDetailPageModule {}
