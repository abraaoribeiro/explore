import { Injectable, NgZone } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { Events,  } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class NetworkService {

constructor(private network:Network, public events: Events,public ngZone:NgZone ) { }

public async getNewtwork(networkType:string){
  networkType = this.network.type;

  // Offline event
await  this.events.subscribe('network:offline', () => {

    this.ngZone.run(() => {
      networkType = this.network.type;
      console.log(this.network.type);
      
    });
  });

  // Online event
 await this.events.subscribe('network:online', () => {
    this.ngZone.run(() => {
      networkType = this.network.type;

      console.log(this.network.type);
    });
  });
  
return networkType
}

}
