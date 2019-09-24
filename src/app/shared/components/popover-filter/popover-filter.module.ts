import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PopoverFilterComponent } from './popover-filter.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  declarations: [PopoverFilterComponent],
  exports:[PopoverFilterComponent]
})
export class PopoverFilterModule { }
