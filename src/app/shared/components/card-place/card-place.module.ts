import { StarRating } from 'ionic4-star-rating';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CardPlaceComponent } from './card-place.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule
  ],
  declarations: [CardPlaceComponent,StarRating],
  exports: [CommonModule,CardPlaceComponent,StarRating]
})
export class CardPlaceModule { }
