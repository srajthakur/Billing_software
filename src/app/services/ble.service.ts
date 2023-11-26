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
  connect(deviceId: any, callbackSuccess: any, callbackError: any) {
    ble.connect(deviceId, callbackSuccess, callbackError);
  }

  print(deviceId: any, data: any, callbackSuccess: any, callbackError: any) {
    ble.write( data, callbackSuccess, callbackError)
    ble.sendPrinterData( data, callbackSuccess, callbackError)
    
  }
  print1(deviceId: any, data: any, callbackSuccess: any, callbackError: any) {
    ble.write( data, callbackSuccess, callbackError)
    ble.sendTextData( data, callbackSuccess, callbackError);
    
  }

  print3(deviceId: any, data: any, callbackSuccess: any, callbackError: any) {
    ble.sendPrinterData(deviceId, data, callbackSuccess, callbackError);
  }
  print4(deviceId: any, data: any, callbackSuccess: any, callbackError: any) {
    ble.sendTextData(deviceId,data, callbackSuccess, callbackError);
  
  
}
print5(deviceId: any, data: any, callbackSuccess: any, callbackError: any) {
 
  ble.sendToBluetoothPrinter( data, callbackSuccess, callbackError);
}

print6(deviceId: any, data: any, callbackSuccess: any, callbackError: any){
ble.write( data, callbackSuccess, callbackError)
ble.sendToBluetoothPrinter( data, callbackSuccess, callbackError)
}
connp(deviceId: any, data: any, callbackSuccess: any, callbackError: any){
  ble.connectAndPrint(deviceId, data,callbackSuccess, callbackError)
}
}