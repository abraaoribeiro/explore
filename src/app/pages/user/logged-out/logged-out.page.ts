import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { auth } from 'firebase';
import { Router } from '@angular/router';
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
  }
}
