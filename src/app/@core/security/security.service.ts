import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  private userId: string;

  constructor(private firebaseauth: AngularFireAuth) { }


  init() {
    return new Promise((resolve, reject) => {
      this.firebaseauth.user.subscribe(user => {
        if (user) {
          this.userId = user.uid;
          console.log(user.uid);
        }
        resolve();
      });
    });
  }

  getUserId(): string {
    return this.userId;
  }
  
}
