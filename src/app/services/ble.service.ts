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
  connect(deviceId: string, callbackSuccess: any, callbackError: any) {
    ble.connect(deviceId, callbackSuccess, callbackError);
  }

  print(deviceId: string, data: string, callbackSuccess: any, callbackError: any) {
    ble.write(deviceId, data, callbackSuccess, callbackError);
  }
}
