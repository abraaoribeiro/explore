import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ErrorHandlerException } from './@core/handlers/error-handler-exception.ts.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PopoverFilterComponent } from './shared/components/popover-filter/popover-filter.component';
import { PopoverFilterModule } from './shared/components/popover-filter/popover-filter.module';


registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [AppComponent],
  entryComponents: [PopoverFilterComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    AngularFireAuthModule,
    PopoverFilterModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: ErrorHandler, useClass: ErrorHandlerException }, ErrorHandlerException,
    { provide: LOCALE_ID, useValue: "pt-BR" },
    { provide: ErrorHandler, useClass: ErrorHandlerException }, ErrorHandlerException
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
