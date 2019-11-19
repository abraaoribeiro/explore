import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/model/user-model';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  user: any;
  constructor(private auth:AuthService) {}

  ngOnInit() {}
  
  ionViewWillEnter() {
    this.auth.userDetails().then(user => {
      this.user = user;
      console.log(user);
      //this.user.email = user.email;
    })
  
  }

}
