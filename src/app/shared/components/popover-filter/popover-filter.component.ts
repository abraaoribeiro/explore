import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { CategoryModel } from 'src/app/model/category-model';
import { PlaceService } from 'src/app/service/place.service';

@Component({
  selector: 'app-popover-filter',
  templateUrl: './popover-filter.component.html',
  styleUrls: ['./popover-filter.component.scss']
})
export class PopoverFilterComponent implements OnInit {

  @Input() range:string;
  @Input() category:string;
  @Input() name: string;
  categoryModel: CategoryModel = new CategoryModel();
  categorys: any;
  categorySelected: any;

  constructor(
    private placeService: PlaceService,
    public popoverController: PopoverController,
    private router: Router) { }

  ngOnInit() {
    this.categoryModel.name = this.name;
    this.categoryModel.range = this.range;
    this.categoryModel.type = this.category;
    this.categorySelected = {name: this.categoryModel.name};

    this.placeService.getPlaceCategorys().subscribe(category => {
      this.categorys = category;
    });

  }

  okPopover() {
    this.categoryModel.name = this.categorySelected.name;
    this.router.navigate(['/place-list'], { queryParams: { 'category': this.categoryModel.type, 'range': this.categoryModel.range, 'name': this.categoryModel.name }, queryParamsHandling: 'merge' });
    this.popoverController.dismiss('verifid');
  }

  cancelPopover() {
    this.popoverController.dismiss();
  }

}
