import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PlaceFavoritePage } from './place-favorite.page';

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
    RouterModule.forChild(routes)
  ],
  declarations: [PlaceFavoritePage]
})
export class PlaceFavoritePageModule {}
