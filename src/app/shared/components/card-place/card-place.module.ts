import { StarRating } from 'ionic4-star-rating';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CardPlaceComponent } from './card-place.component';

@NgModule({
  imports: [
    CommonModule,
    CommonModule,
    FormsModule,
    IonicModule,
    
  ],
  declarations: [CardPlaceComponent,StarRating],
  exports: [CommonModule,CardPlaceComponent,StarRating]
})
export class CardPlaceModule { }
