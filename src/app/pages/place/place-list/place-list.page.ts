import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PlaceService } from 'src/app/service/place.service';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.page.html',
  styleUrls: ['./place-list.page.scss'],
})
export class PlaceListPage implements OnInit {

  places = []
  type: any = ''
  range: any = '500';
  constructor(private placeService: PlaceService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getPlaces();
  }


  async getPlaces() {
    const type = this.route.snapshot.params['type'];
    this.type = type;
    let place = await this.placeService.getPlaces(this.range, this.type);
    this.places = place;
    console.log(place);

  }
}
