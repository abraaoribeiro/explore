import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CardPlaceComponent } from './card-place.component';
import { StarRating } from 'ionic4-star-rating';

@NgModule({
  imports: [
    CommonModule,
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [CardPlaceComponent,StarRating],
  exports: [CommonModule,CardPlaceComponent]
})
export class CardPlaceModule { }
