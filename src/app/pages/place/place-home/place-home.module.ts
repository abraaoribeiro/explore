import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';


import { CardPlaceModule } from 'src/app/shared/components/card-place/card-place.module';
import { PlaceHomePage } from './place-home.page';
import { SearchPlacesModule } from 'src/app/shared/components/search-places/search-places.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPlacesModule,
    CardPlaceModule,
    RouterModule.forChild([{ path: '', component: PlaceHomePage }])
  ],
  declarations: [PlaceHomePage]
})
export class PlaceHomePageModule { }
