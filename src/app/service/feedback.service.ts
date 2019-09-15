import { ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(public toastController: ToastController) { }

  async presentToastWithOptions(messge: string) {
    const toast = await this.toastController.create({
      animated: true,
      color: 'primary',
      cssClass: 'toast-success',
      duration: 4000,
      keyboardClose: true,
      message: messge,
      mode: 'ios',
      position: 'top',
      translucent: true,
      buttons: [{
        icon: 'close',
        role: 'cancel',
        handler: () => {

        }
      }]
    });
    toast.present();
  }


}
