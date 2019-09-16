import { ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(public toastController: ToastController) { }

  async presentToastWithOptions(messge: string) {
    const toast = await this.toastController.create({
      color: 'primary',
      duration: 4000,
      message: messge,
      mode: 'ios',
      position: 'top',
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
