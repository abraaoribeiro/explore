import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SearchPlacesComponent } from './search-places.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [SearchPlacesComponent],
  exports: [SearchPlacesComponent]
})
export class SearchPlacesModule { }
