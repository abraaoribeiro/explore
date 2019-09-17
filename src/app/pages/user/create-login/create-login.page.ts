import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/model/user-model';
import { AuthService } from 'src/app/service/auth.service';
import { FeedbackService } from './../../../service/feedback.service';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-create-login',
  templateUrl: './create-login.page.html',
  styleUrls: ['./create-login.page.scss'],
})
export class CreateLoginPage implements OnInit {
  userModel: UserModel = new UserModel();

  constructor(private authService: AuthService, public loadingController: LoadingController) { }

  ngOnInit() { }


  public async createLogin() {
    const loading = await this.loadingController.create({
      spinner: 'dots',
      mode: 'ios',
    });
    await loading.present();
    await this.authService.createLogin({ email: this.userModel.email, password: this.userModel.password, name: this.userModel.name })
      .then(() => {
        //TODO REDIRECIONAR
        loading.dismiss();
      }).catch(erro => {
        this.authService.validCredential(erro.code);
        this.authService.showMessageValid();
        loading.dismiss();
      })
  }

  showPassword(input: any): any {
    input.type = input.type === 'password' ? 'text' : 'password';
  }



}
