import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PlaceCategoryPage } from './place-category.page';

const routes: Routes = [
  {
    path: '',
    component: PlaceCategoryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PlaceCategoryPage],
  exports: [PlaceCategoryPage]
})
export class PlaceCategoryPageModule { }
