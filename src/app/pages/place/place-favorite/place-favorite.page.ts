import { Component, OnInit } from '@angular/core';
import { FavoriteService } from 'src/app/service/favorite.service';
import { PlaceService } from './../../../service/place.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-place-favorite',
  templateUrl: './place-favorite.page.html',
  styleUrls: ['./place-favorite.page.scss'],
})
export class PlaceFavoritePage implements OnInit {

  constructor(private favoriteService:FavoriteService, private placeService:PlaceService, private route:ActivatedRoute) { }

  ngOnInit() {}

  ionViewDidEnter() {
    this.favoriteService.list().subscribe(res => console.log(res))
  }
}
