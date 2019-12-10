import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';
import { UserModel } from './../../../model/user-model';
import { FeedbackService } from 'src/app/service/feedback.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userModel: UserModel = new UserModel();
  constructor(private authService: AuthService,
    private router: Router,
    public loadingController: LoadingController,
    private feedbackService: FeedbackService) { }

  ngOnInit() {
    this.feedbackService.statusBarHeader();
  }

  public async login() {
    const loading = await this.loadingController.create({
      spinner: 'dots',
      mode: 'ios',
    });
    await loading.present();
    await this.authService.loginEmail({ email: this.userModel.email, password: this.userModel.password })
      .then(() => {
        this.router.navigate(['tabs/tab1']);
        loading.dismiss();
      }).catch(erro => {
        console.log(erro);
        this.authService.validCredential(erro.code);
        this.authService.showMessageValid();
        loading.dismiss();
      });
  }

  public showPassword(input: any): any {
    input.type = input.type === 'password' ? 'text' : 'password';
  }

}
