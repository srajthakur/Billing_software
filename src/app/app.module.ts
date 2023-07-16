import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx'; 
import { MatIconModule } from '@angular/material/icon';
import {BluetoothSerial} from '@ionic-native/bluetooth-serial/ngx';
import { NgxPrinterModule } from 'ngx-printer';




@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,MatIconModule,NgxPrinterModule],
  providers: [NativeStorage,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },BluetoothSerial],
  bootstrap: [AppComponent],
})
export class AppModule {}
