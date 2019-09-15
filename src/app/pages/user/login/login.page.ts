import { UserModel } from './../../../model/user-model';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userModel: UserModel = new UserModel();
  constructor(private firebasseAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  login() {
    this.firebasseAuth.auth.signInWithEmailAndPassword(this.userModel.email, this.userModel.password)
    .then(res => console.log(res)
    );
  }
  showPassword(input: any): any {
    input.type = input.type === 'password' ? 'text' : 'password';
  }

}
