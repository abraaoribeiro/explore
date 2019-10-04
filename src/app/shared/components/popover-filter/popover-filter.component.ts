import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { CategoryModel } from 'src/app/model/category-model';
import { PlaceService } from 'src/app/service/place.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-popover-filter',
  templateUrl: './popover-filter.component.html',
  styleUrls: ['./popover-filter.component.scss']
})
export class PopoverFilterComponent implements OnInit {

  @Input() range: any;
  @Input() category: string;
  @Input() name: string;
  categoryModel: CategoryModel = new CategoryModel();
  categorys: any;
  categorySelected: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private placeService: PlaceService,
    public popoverController: PopoverController,
    private router: Router) { }

  ngOnInit() {
    this.categoryModel.name = this.name;
    this.categoryModel.range = this.range;
    this.categoryModel.type = this.category;
    this.categorySelected = { name: this.categoryModel.name };
    this.categorySelected.type = { type: this.categoryModel.type };
    this.placeService.getPlaceCategorys().pipe(takeUntil(this.destroy$)).subscribe(category => this.categorys = category);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  okPopover() {
    this.categoryModel.name = this.categorySelected.name;
    this.categoryModel.type = this.categorySelected.type;
    console.log("OkPopover", this.categorySelected.type);
    this.router.navigate(['/place-list'], { queryParams: { 'category': this.categoryModel.type, 'range': this.categoryModel.range, 'name': this.categoryModel.name }, queryParamsHandling: 'merge' });
    this.popoverController.dismiss('verifid');
  }

  cancelPopover() {
    this.popoverController.dismiss();
  }

  buttonAddRange(val) {
    if (val == 'rangeAdd') {
      this.categoryModel.range++;
    }
  }

  buttonRemoveRange(val) {
    if (val == 'rangeRemove') {
      this.categoryModel.range--;
    }
  }

}
