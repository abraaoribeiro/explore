import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-place',
  templateUrl: './card-place.component.html',
  styleUrls: ['./card-place.component.scss']
})
export class CardPlaceComponent implements OnInit {

  @Input() places: [] = [];
  defaultImage = 'assets/img/undraw_empty_xct9.svg'
  constructor(private router:Router) { }

  ngOnInit() {
  }

  getImagens(imagens: any): string {
    let url: string;
    if (imagens) {
      imagens.forEach(image => {
        url = image.getUrl();
        return
      });
    }
    return url;
  }

  forward(place){
    this.router.navigate(['/place-detail',place.reference])
  }
}
