import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
declare let google;
@Component({
  selector: 'app-search-places',
  templateUrl: './search-places.component.html',
  styleUrls: ['./search-places.component.css']
})
export class SearchPlacesComponent implements OnInit {
  input: string = '';
  placesResult = new Array<any>();
  private googleAutocomplete = new google.maps.places.AutocompleteService();
  constructor(private ngZone: NgZone, private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }


  public searchPlaces() {
    if (!this.input.trim().length) return;
    this.googleAutocomplete.getPlacePredictions({ input: this.input, componentRestrictions: { country: "br" } }, predictions => {
      this.ngZone.run(() => {
        this.placesResult = predictions;
        console.log(predictions);
      })
    })
  }

  routeNavegation(place){
    if (this.validRouterQuary() == 'valid') {
      this.router.navigate(['/guide-edit'], { queryParams: { place: place.terms[0].value } });
    }else{
      this.router.navigate(['/place-detail', place.reference])
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
