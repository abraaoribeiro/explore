import { CardPlaceModule } from './../../../shared/components/card-place/card-place.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GuideListPage } from './guide-list.page';
import { intersectionObserverPreset, LazyLoadImageModule } from 'ng-lazyload-image';
import { FeadbackEmptyModule } from 'src/app/shared/components/feadback-empty/feadback-empty.module';

const routes: Routes = [
  {
    path: '',
    component: GuideListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardPlaceModule, LazyLoadImageModule.forRoot({
      preset: intersectionObserverPreset
    }), RouterModule.forChild(routes),
    FeadbackEmptyModule
  ],
  declarations: [GuideListPage]
})
export class GuideListPageModule { }
