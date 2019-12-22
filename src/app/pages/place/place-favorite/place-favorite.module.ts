import { FeadbackEmptyModule } from './../../../shared/components/feadback-empty/feadback-empty.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PlaceFavoritePage } from './place-favorite.page';
import { CardPlaceModule } from 'src/app/shared/components/card-place/card-place.module';

const routes: Routes = [
  {
    path: '',
    component: PlaceFavoritePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardPlaceModule,
    FeadbackEmptyModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PlaceFavoritePage]
})
export class PlaceFavoritePageModule {}
