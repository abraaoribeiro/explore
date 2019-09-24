import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimatedFavoriteComponent } from './animated-favorite.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [AnimatedFavoriteComponent],
  exports:[AnimatedFavoriteComponent]
})
export class AnimatedFavoriteModule { }
