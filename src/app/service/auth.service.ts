import { FeedbackService } from './feedback.service';
import { UserModel } from './../model/user-model';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: UserModel
  constructor(private firebasseAuth: AngularFireAuth) { }


  public async loginEmail(user: UserModel) {
    await this.firebasseAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  public async createLogin(user: UserModel) {
    let result = await this.firebasseAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
    result.additionalUserInfo.username = user.name;
  }

}
