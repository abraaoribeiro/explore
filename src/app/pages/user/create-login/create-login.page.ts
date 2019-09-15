import { FeedbackService } from './../../../service/feedback.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserModel } from 'src/app/model/user-model';
import { User } from 'firebase';


@Component({
  selector: 'app-create-login',
  templateUrl: './create-login.page.html',
  styleUrls: ['./create-login.page.scss'],
})
export class CreateLoginPage implements OnInit {
  userModel: UserModel = new UserModel();
  textPasswordLabel: string;
  user: User;
  constructor(private firebasseAuth: AngularFireAuth, private feedbackService: FeedbackService) { }

  ngOnInit() {
  }
  createLogin() {
    this.firebasseAuth.auth
      .createUserWithEmailAndPassword(this.userModel.email, this.userModel.password)
      .then(res => {
        res.additionalUserInfo.username = this.userModel.name
        this.feedbackService.presentToastWithOptions('Usuario cadastrado com sucesso')
      });
  }
  showPassword(input: any): any {
    input.type = input.type === 'password' ? 'text' : 'password';
  }

}
