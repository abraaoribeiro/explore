import { UserModel } from './../../../model/user-model';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userModel: UserModel = new UserModel();
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  public async login() {
   await this.authService.loginEmail({ email: this.userModel.email, password: this.userModel.password }).then();
    this.router.navigate(['tabs/tab1']);

  }
  showPassword(input: any): any {
    input.type = input.type === 'password' ? 'text' : 'password';
  }

}
