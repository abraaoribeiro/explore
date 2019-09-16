import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/model/user-model';
import { AuthService } from 'src/app/service/auth.service';
import { FeedbackService } from './../../../service/feedback.service';


@Component({
  selector: 'app-create-login',
  templateUrl: './create-login.page.html',
  styleUrls: ['./create-login.page.scss'],
})
export class CreateLoginPage implements OnInit {
  userModel: UserModel = new UserModel();

  constructor(private authService: AuthService, private feedbackService: FeedbackService) { }

  ngOnInit() { }


  public async createLogin() {
    await this.authService.createLogin({ email: this.userModel.email, password: this.userModel.password, name: this.userModel.name })
      .then(() => {
        //TODO REDIRECIONAR
      }).catch(erro => {
        this.authService.validCredential(erro.code);
        this.authService.showMessageValid();
      })
  }

  showPassword(input: any): any {
    input.type = input.type === 'password' ? 'text' : 'password';
  }



}
