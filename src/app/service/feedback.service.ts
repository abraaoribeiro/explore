import { ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(
    public toastController: ToastController,
    private localNotifications: LocalNotifications,
    private statusBar: StatusBar,
  ) { }

  public async presentToastWithOptions(messge: string, color: string) {
    const toast = await this.toastController.create({
      duration: 2000,
      message: messge,
      color: color,
      mode: 'ios',
      position: 'top',
      buttons: [{
        icon: 'close',
        role: 'cancel',
        handler: () => { }
      }]
    });
    toast.present();
  }

  public localNotification(titulo: string, img?: string, timeEnd?: Date, text?: string) {
    this.localNotifications.schedule({
      title: titulo,
      text: text,
      icon: 'assets/icon/favicon.png',
      trigger: { at: timeEnd },
      led: "FF0000",
      attachments: [img],
      sound: 'file://sound.mp3',
      foreground: true
    });
  }


  public statusBarHeader() {
  //  this.statusBar.styleDefault();
   // this.statusBar.backgroundColorByHexString("#00868b");
  }
}
