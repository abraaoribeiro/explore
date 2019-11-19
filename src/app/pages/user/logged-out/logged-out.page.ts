import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-logged-out',
  templateUrl: './logged-out.page.html',
  styleUrls: ['./logged-out.page.scss'],
})
export class LoggedOutPage implements OnInit {

  constructor(private authService:AuthService, private router: Router, public loadingController: LoadingController) { }

  ngOnInit() {}

  public async loginGoogle() {
    const loading = await this.loadingController.create({
      spinner: 'dots',
      mode: 'ios',
      cssClass: 'spinner',
      animated: true
    });
    await loading.present();
    this.authService.googleSignIn().then((res) => {
      this.router.navigate(['tabs/tab1']);
      loading.dismiss();
    });
  }
}
