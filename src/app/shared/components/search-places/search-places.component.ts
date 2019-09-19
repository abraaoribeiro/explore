import { Component, OnInit, NgZone } from '@angular/core';
declare let google;
@Component({
  selector: 'app-search-places',
  templateUrl: './search-places.component.html',
  styleUrls: ['./search-places.component.css']
})
export class SearchPlacesComponent implements OnInit {
  input: string = '';
  placesResult: [] = [];
  private googleAutocomplete = new google.maps.places.AutocompleteService();
  constructor(private ngZone: NgZone) { }

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
}
