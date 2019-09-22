import { GoogleMapsService } from 'src/app/service/google-maps.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {

  place: any;

  constructor(private googleMapsService: GoogleMapsService, 
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.getPlaceDetail()
  }

  getPlaceDetail() {
    let place_id = this.route.snapshot.params['id'];
    this.googleMapsService.getPlaceDetail('', place_id).then(placeDetail => {
      console.log(placeDetail);
      this.place = placeDetail;
    })
  }

  buttonBack(){
    this.router.navigateByUrl('/tabs/tab1')
  }
}
