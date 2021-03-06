import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CardPlaceModule } from 'src/app/shared/components/card-place/card-place.module';
import { SearchPlacesModule } from 'src/app/shared/components/search-places/search-places.module';
import { PlaceListPage } from './place-list.page';
import { FeadbackEmptyModule } from 'src/app/shared/components/feadback-empty/feadback-empty.module';

const routes: Routes = [
  {
    path: '',
    component: PlaceListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    CardPlaceModule,
    FeadbackEmptyModule,
    SearchPlacesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PlaceListPage]
})
export class PlaceListPageModule {}
