import { FeedbackService } from './feedback.service';
import { UserModel } from './../model/user-model';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userModel: UserModel
  messageErro: string;
  constructor(private firebasseAuth: AngularFireAuth, private feedbackService: FeedbackService) { }


  public async loginEmail(user: UserModel) {
    await this.firebasseAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  public async createLogin(user: UserModel) {
    let result = await this.firebasseAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
    result.additionalUserInfo.username = user.name;
  }

  public async loginProvider(provider) {
   await this.firebasseAuth.auth.signInWithPopup(provider).then(()=>{
     return this.firebasseAuth.auth.getRedirectResult();
   });
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

  showMessageValid() {
    this.feedbackService.presentToastWithOptions(this.messageErro).then();
  }

}
