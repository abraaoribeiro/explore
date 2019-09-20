import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-logged-out',
  templateUrl: './logged-out.page.html',
  styleUrls: ['./logged-out.page.scss'],
})
export class LoggedOutPage implements OnInit {

  constructor(private authService:AuthService, private router: Router) { }

  ngOnInit() {
  }

  public loginGoogle() {
    this.authService.loginProvider(new firebase.auth.GoogleAuthProvider)
  }
}
