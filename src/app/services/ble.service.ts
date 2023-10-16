import { Injectable } from '@angular/core';

declare var ble: any; // Import the Cordova BLE plugin

@Injectable({
  providedIn: 'root',
})
export class BleService {
  constructor() {}

  scanForDevices(callbackSuccess:any, callbackError:any) {
    ble.scan([], 5, callbackSuccess, callbackError);
  }

  // Add other BLE-related methods here
}
