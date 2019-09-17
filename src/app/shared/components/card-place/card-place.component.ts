import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-place',
  templateUrl: './card-place.component.html',
  styleUrls: ['./card-place.component.scss']
})
export class CardPlaceComponent implements OnInit {

  @Input() places: [] = [];
  defaultImage = 'assets/shapes.svg'
  constructor() { }

  ngOnInit() {
  }

  getImagens(imagens: any): string {
    let url: string;
    if (imagens) {
      imagens.forEach(image => {
        url = image.getUrl();
        return
      });
    } else {
      return this.defaultImage
    }
    return url;
  }
}
