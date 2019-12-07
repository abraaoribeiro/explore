import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import "@codetrix-studio/capacitor-google-auth";
import { auth } from 'firebase';
import { UserModel } from './../model/user-model';
import { FeedbackService } from './feedback.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userModel: UserModel
  messageErro: string;

  constructor(private firebaseAuth: AngularFireAuth,
    private feedbackService: FeedbackService, private router: Router) { }


  public async loginEmail(user: UserModel) {
    await this.firebaseAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  public async createLogin(user: UserModel) {
    let result = await this.firebaseAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
    result.additionalUserInfo.username = user.name;
  }

  public userDetails(): Promise<any> {
    let user;
    return new Promise((resolve, reject) => {
      user = this.firebaseAuth.auth.currentUser;
      resolve(user), err => reject(err);
    });
  }


  public logout() {
    this.firebaseAuth.auth.signOut().then(() => {
      this.router.navigate(["logged-outout"]);
    });
  }

  public async stateUser() {
    this.firebaseAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this.userModel.email = user.email;
        this.userModel.name = user.displayName;
        this.userModel.img = user.photoURL;
        this.router.navigate(['tabs/tab1']);
      } else {
        this.router.navigate(['logged-out']);
      }
    })
  }


  public async googleSignIn() {
    let googleUser = await Plugins.GoogleAuth.signIn();
    const credential = auth.GoogleAuthProvider.credential(googleUser.authentication.idToken);
    return this.firebaseAuth.auth.signInAndRetrieveDataWithCredential(credential);

  }

  public validCredential(erro) {
    switch (erro) {
      case "auth/invalid-email":
        this.messageErro = "O endereço de email está mal formatado."
        break;
      case "auth/wrong-password":
        this.messageErro = "A senha é inválida ou o usuário não tem uma senha."
        break;
      case "auth/email-already-in-use":
        this.messageErro = "O endereço de email já está sendo usado por outra conta."
        break;
      case "auth/weak-password":
        this.messageErro = "A senha deve ter pelo menos 6 caracteres."
        break;
    }
  }

  public showMessageValid() {
    this.feedbackService.presentToastWithOptions(this.messageErro).then();
  }


}
