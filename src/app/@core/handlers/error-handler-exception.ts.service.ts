import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerException {

  constructor(private _toastController: ToastController) { }

  public handleError(error) {
    if(!error) return;
    if (error instanceof HttpErrorResponse) {
        let statusCode: number = error.status;
        // Server or connection error happened
        if (!navigator.onLine) {
            // Handle offline error
            this.show("Sem conexão com a internet");
        } else {
            if (error.error.message) {
                this.show(error.error.message);
            } else {
                this.show('Problema ao conectar ao servidor!');
            }
        }
    } else if (error.rejection) {
        if(error.rejection.message){
            this.show(error.rejection.message);
        }
    } else {
        this.show(error.message);
    }
}

async show(error) {
  const toast = await this._toastController.create({
      message: error,
      color: 'danger',
      duration: 10000,
      position:'top',
      mode: 'ios',
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
