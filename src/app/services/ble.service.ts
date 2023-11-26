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
    ble.printText(deviceId, data, callbackSuccess, callbackError);
  }
  print1(deviceId: string, data: string, callbackSuccess: any, callbackError: any) {
    ble.printPOSCommand(deviceId, data, callbackSuccess, callbackError);
  }

  print3(deviceId: string, data: string, callbackSuccess: any, callbackError: any) {
    ble.printText( data, callbackSuccess, callbackError);
  }
  print4(deviceId: string, data: string, callbackSuccess: any, callbackError: any) {
    ble.printPOSCommand( data, callbackSuccess, callbackError);
  
  
}
print5(deviceId: string, data: string, callbackSuccess: any, callbackError: any) {
  ble.write(deviceId, data, callbackSuccess, callbackError);
  ble.printText(deviceId, data, callbackSuccess, callbackError);
}
print6(deviceId: string, data: string, callbackSuccess: any, callbackError: any) {
  ble.write(data, callbackSuccess, callbackError);
  ble.printText(data, callbackSuccess, callbackError);
}
}