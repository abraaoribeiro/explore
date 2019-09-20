import { GoogleMapsService } from 'src/app/service/google-maps.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-place-category',
  templateUrl: './place-category.page.html',
  styleUrls: ['./place-category.page.scss'],
})
export class PlaceCategoryPage implements OnInit {
  categorys: any;
  texCatHeader: any
  textCatContent:any
  constructor(public modalController: ModalController, private googleMapsService: GoogleMapsService) { }

  ngOnInit() {
    this.placeCategory();
  }

  closeModal() {
    this.modalController.dismiss();
  }

  logScrolling(event){
    console.log(event)
    if(event.detail.scrollTop >= 42){
     return this.texCatHeader = "Categorias"
    }else if(event.detail.scrollTop == 0){
      return this.textCatContent = "Categorias"
    }
    
  }

  placeCategory() {
    this.googleMapsService.getPlaceCategorys().subscribe(categorys => this.categorys = categorys)
  }
}
