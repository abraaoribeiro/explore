import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { StarRating } from 'ionic4-star-rating';
import { AnimatedFavoriteModule } from '../animated-favorite/animated-favorite.module';
import { CardPlaceComponent } from './card-place.component';
import { intersectionObserverPreset, LazyLoadImageModule } from 'ng-lazyload-image';
@NgModule({
  imports: [
    CommonModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    LazyLoadImageModule.forRoot({
      preset: intersectionObserverPreset
    }),
    AnimatedFavoriteModule,
  ],
  declarations: [CardPlaceComponent,StarRating],
  exports: [CommonModule,CardPlaceComponent,StarRating]
})
export class CardPlaceModule { }
