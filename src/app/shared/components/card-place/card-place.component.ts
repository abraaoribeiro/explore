import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-card-place',
  templateUrl: './card-place.component.html',
  styleUrls: ['./card-place.component.scss']
})
export class CardPlaceComponent implements OnInit {

  @Input() places: [] = [];
  defaultImage = 'assets/img/undraw_empty_xct9.svg'
  constructor(private router: Router, private route: ActivatedRoute) { }

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

  forward(place) {
    if (this.validRouterQuary() != 'valid') {
      this.router.navigate(['/place-detail', place.reference]);
    }
  }

  setPlaceGuide(place) {
    if (this.validRouterQuary() == 'valid') {
      this.router.navigate(['/guide-edit'], { queryParams: { place: place.name, rating: place.rating, reference: place.reference } });
    }
  }

  validRouterQuary() {
    let valid = '';
    this.route.queryParams.subscribe(query => {
      valid = query.validRoute;
    })
    return valid;
  }
}
