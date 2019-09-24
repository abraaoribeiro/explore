import { PlaceService } from 'src/app/service/place.service';
import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CategoryModel } from 'src/app/model/category-model'

@Component({
  selector: 'app-popover-filter',
  templateUrl: './popover-filter.component.html',
  styleUrls: ['./popover-filter.component.scss']
})
export class PopoverFilterComponent implements OnInit {

  categoryModel: CategoryModel = new CategoryModel();
  categorys: any;
  constructor(private placeService: PlaceService, public popoverController: PopoverController, private router: Router) { }

  ngOnInit() {
    this.placeService.getPlaceCategorys().subscribe(category => this.categorys = category);
  }

  closePopover() {
    this.router.navigate(['/place-list'], { queryParams: { 'category': this.categoryModel.type, 'range': this.categoryModel.range, 'name': this.categoryModel.name }, queryParamsHandling: 'merge' });
    this.popoverController.dismiss('verifid');
  }

  cancelPopover(){
    this.popoverController.dismiss();
  }

}
