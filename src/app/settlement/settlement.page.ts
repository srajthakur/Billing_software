import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { MatTableDataSource ,MatTableModule} from '@angular/material/table';
import { PrintServiceA } from '../services/print.service';

import { AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';


import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { ApiService } from '../services/api.service';
import { BleService } from '../services/ble.service';

interface MyObject {
  'date' : string,
  'totalBill' : string,
  'totalSale': string
}

@Component({
  selector: 'app-settlement',
  templateUrl: 'settlement.page.html',
  styleUrls: ['settlement.page.scss'],
})
export class SettlementPage {
  
  displayedColumns: string[] = ['date', 'totalBill', 'totalSale','action'];
  dataSource :  MatTableDataSource<any>;
  tableData :MyObject[]=[]
  viewBill : string ='daySale'
  bluetoothList:any=[];
  selectedPrinter:any;
  characteristic:any
  status: boolean = false;
  loggedin :boolean=false;
  loginEmail: string = '';
  loginPassword: string= '';
   bdata: { [key: string]: string } = {
    key1: "Value 1"
  };
  selectedDevice:any=''
  


  ip: string = ''
  deviceOptions: RequestDeviceOptions = {
    acceptAllDevices: true,
  };

  constructor(private bleservice:BleService, private apiService: ApiService,private bluetoothSerial: BluetoothSerial,private navCtrl: NavController,private AlertController:AlertController,private nativeStorage:NativeStorage,private platform: Platform,private printserviceAndroid: PrintServiceA) {
    this.dataSource = new MatTableDataSource(this.tableData)  
  
   
      this.bleservice.scanForDevices(
        (device:any) => {
          // Handle success, e.g., display the discovered device
          console.log('Discovered device: ' + device.name || device.id);
          
            
          this.showAlert(device.name)
        },
        (error:any) => {
          // Handle error
          console.error('Error: ' + JSON.stringify(error));
          this.showAlert(JSON.stringify(error))
        }
      );
     
    this.getData()
    // this.checkBluetoothPermissions()
    // this.ionViewDidEnter()
    this.viewBill='daySale'
    // navigator.bluetooth.requestDevice(this.deviceOptions)
    // .then(device => {
    //   // Process the selected Bluetooth device
    //   console.log('Selected Device:', device.name);

    //                     device.gatt?.connect().then((gattServer) => {
    //                       console.log('Connected to GATT server:', gattServer);
    //                       // Proceed with printing
    //                                   const serviceUUID = device.id;
    //                                   const characteristicUUID = device.id;
                                       
    //                                     gattServer.getPrimaryServices()
    //                                       .then((service) => {
    //                                         console.log('in services')
    //                                         return service.getCharacteristic(characteristicUUID);
    //                                       })
    //                                       .then((characteristic) => {
    //                                         const printData = 'your-print-command-data';

    //                                     characteristic.writeValue(new TextEncoder().encode(printData))
    //                                       .then(() => {
    //                                         console.log('Print command sent successfully');
    //                                       })
    //                                       .catch((error) => {
    //                                         console.error('Error sending print command:', error);
    //                                       });
    //                                         // Proceed with printing using the characteristic
    //                                       })
    //                 .catch((error) => {
    //                   console.error('Error retrieving service or characteristic:', error);
    //                 });

    //                     })
    //         .catch((error) => {
    //           console.error('Error connecting to GATT server:', error);
    //         });
    //       })
    // .catch(error => {
    //   console.error('Bluetooth error:', error);
    // });
    // console.log('afterrrrrrrrrr')
//     navigator.bluetooth.requestDevice({
//       filters: [{
//         services: ['000018f0-0000-1000-8000-00805f9b34fb']
//       }]
//     })
//   .then(device => {
//     // Process the selected Bluetooth device
//     console.log('Selected Device:', device.name);

//     device.gatt?.connect()
//       .then(gattServer => {
//         console.log('Connected to GATT server:', gattServer);
//         // Proceed with printing
//         const serviceUUID = '000018f0-0000-1000-8000-00805f9b34fb'
//         const characteristicUUID = '00002af1-0000-1000-8000-00805f9b34fb';
//         console.log('000018f0-0000-1000-8000-00805f9b34fb')
//         console.log(device.name)
//         console.log('00002af1-0000-1000-8000-00805f9b34fb')
//         console.log(device.id)

//         gattServer.getPrimaryService(serviceUUID)
//           .then(service => {
//             console.log('In service');
//             return service.getCharacteristic(characteristicUUID);
//           })
//           .then(characteristic => {
//             const printData = 'your-print-command-data';
//             this.characteristic=characteristic
//             // //characteristic.writeValue(new TextEncoder().encode('Hello Hello Hello Hello' + '\u000A\u000D'))
//             //   .then(() => {
//             //     console.log('Print command sent successfully');
//             //   })
//             //   .catch(error => {
//             //     console.error('Error sending print command:', error);
//             //   });
//             // Proceed with printing using the characteristic
//           })
//           .catch(error => {
//             console.error('Error retrieving service or characteristic:', error);
//           });
//       })
//       .catch(error => {
//         console.error('Error connecting to GATT server:', error);
//       });
//   })
//   .catch(error => {
//     console.error('Bluetooth error:', error);
//   });

// console.log('afterrrrrrrrrr');


  }


  //  sendTextData() {
  //   // Get the bytes for the text
  //   // let encoder = new TextEncoder("utf-8");
  //   // Add line feed + carriage return chars to text
  //   let text = new TextEncoder.encode('hello succesfull in task' + '\u000A\u000D');
  //   return printCharacteristic.writeValue(text).then(() => {
  //     console.log('Write done.');
  //   });
  //}



  //  sendPrinterData() {
  //   // Print an image followed by the text
  //   sendImageData()
  //   .then(sendTextData)
  //   .then(() => {
  //     progress.hidden = true;
  //   })
  //   .catch(handleError);
  // }
  


  settle(date:any) {
    
  this.nativeStorage.remove(date)
  this.getData()

  }
  printThroughWebApiServices(date:any){
    console.log(date)
    this.nativeStorage.getItem(date).then((data)=>{
      
      
    }).catch(data=>
      this.showAlert('error in retriving data'))


    this.nativeStorage.getItem(date).then(data=>{
    this.apiService.printSettlement(data).subscribe(
      (response) => {
        // Handle the response from the server after printing the settlement
        console.log('Printing response:', response);
      },
      (error) => {
        console.error('Error printing settlement:', error);
      }
    );
      })
    
  }
  viewDaySale(date:any) {
    const td=[{}]
    console.log(date)
    this.nativeStorage.getItem(date).then(data=>{
      this.displayedColumns =['billNo','totalItem','totalQuantity','totalAmount','paymentMethod']
      this.viewBill='allBill'
      td.splice(0,1)
      for(let i=1;i<data.length;i++){
        td.push({'billNo' : i,'totalItem':data[i].totalItem,'totalQuantity':data[i].totalQuantity,'totalAmount':data[i].totalAmount,'paymentMethod':data[i].paymentMethod})
      }
      this.dataSource = new MatTableDataSource(td)
    })
  }
  async showAlert(message:any) {
    const alert = await this.AlertController.create({
      message: message,
      buttons: ['OK']
    });  await alert.present();
  }
  print(date:any){
         this.printserviceAndroid.searchBluetoothPrinter().then(data=>{
          //this.bluetoothList=data
          
          this.showAlert(this.bluetoothList.length.toString())
         })
  }
  selectPrinter(macAddress:any){
    //Selected printer macAddress stored here
    this.selectedPrinter=macAddress;
  }
  
  //This will print
  printStuff()
  {  
     //The text that you want to print
     var myText="Hello hello hello \n\n\n This is a test \n\n\n Hello hello hello \n\n\n This is a test \n\n\n";
     this.printserviceAndroid.sendToBluetoothPrinter(this.selectedPrinter,myText);
  }
  
  

  navFun(data:string){
    this.loggedin = false
    if (data == 'BILL'){
      this.navCtrl.navigateForward('/bill')
    }
    else if (data == 'RATE'){
      this.navCtrl.navigateForward('/rate')
    }
    else if (data == 'SETTLEMENT'){
      this.navCtrl.navigateForward('/settlement')
    }
    else if (data == 'CUSTOMER'){
      this.navCtrl.navigateForward('/customer')
    }
    else if (data == 'SETTING'){
      this.navCtrl.navigateForward('/setting')
    }
    else if (data == 'LOGOUT'){
      console.log(this.nativeStorage.getItem('logStatus'))
      this.nativeStorage.setItem('logStatus','Logout')
      this.navCtrl.navigateForward('/landing')
    }
  }
  async getData() {
    const td = [{}];
    let i = 2;
  
    while (i > -1) {
      const date = await this.getDate(i);
      console.log(date)
      await this.nativeStorage.getItem(date).then((data) => {
        console.log(data);
        console.log(date);
        let amount = 0;
  
        for (let i = 0; i < data.length; i++) {
          console.log(data[i].totalAmount,";hjlh",typeof(data[i].totalAmount))
          if (data[i].totalAmount)
          {amount +=parseInt( data[i].totalAmount)};
        }
  
        td.push({ 'date': date, 'totalBill': data.length - 1, 'totalSale': amount });
      }).catch(error=>('error in getting data' + date));
  
      i--;
    }
  
    console.log('out', td);
    td.splice(0,1)
    this.dataSource = new MatTableDataSource(td);
  }
  
  async getDate(n: number): Promise<string> {
    const today = new Date();
    console.log(today)
    const date = new Date(today.getTime() - n * 24 * 60 * 60 * 1000);
  
    const dateString = date.toISOString().slice(0, 10);
    
    return dateString;
  }
  back(){
    this.displayedColumns = ['date', 'totalBill', 'totalSale','action'];
    this.getData()
    this.viewBill = 'daySale'
  }
  ngOnInit() {
    this.getData();
  }
  // Function to initiate the Bluetooth device selection process
// async connectToPrinter() {
//   try {
//     // Request a Bluetooth device
//     const device = await navigator.bluetooth.requestDevice({
//       filters: [{ services: ['generic_access'] }],
//     });

//     // Connect to the Bluetooth device
//     const server = await device.gatt?.connect();

//     // Get the primary service of the printer
//     const service = await server?.getPrimaryService('generic_access');

//     // Get the characteristic for sending data to the printer
//     const characteristic = await service?.getCharacteristic('generic_attribute');

//     // Convert print data to the appropriate format
//     const printData = 'Hello, printer!';

//     // Send print data to the printer
//     await characteristic?.writeValue(new TextEncoder().encode(printData));
//   } catch (error) {
//     console.error('Bluetooth connection error:', error);
//   }
// }

//   getPrintweb(){
//                this.characteristic.writeValue(new TextEncoder().encode('Hello Hello Hello Hello' + '\u000A\u000D'))
//               .then(() => {
//                 console.log('Print command sent successfully');
//               })
//               .catch(console.log('error in printing')); 
//   }
// ionViewDidEnter() {
//   this.platform.ready().then(() => {
//     if (this.platform.is('android')) {
//       this.enableBluetooth();
//     } else {
//       console.log('Bluetooth printing is only available on Android devices.');
//       this.showAlert('Bluetooth printing is only available on Android devices.')
//       this.enableBluetooth()
//     }
    
//   });
// }
// enableBluetooth() {
//   this.bluetoothSerial.enable().then(() => {
//     this.listBluetoothDevices();
//   }).catch((error) => {
//     console.log('Error enabling Bluetooth', error);
//     this.listBluetoothDevices();
//     this.showAlert('Error enabling Bluetooth')
//   });
// }

// listBluetoothDevices() {
//   this.bluetoothSerial.list().then((devices) => {
//     // devices is an array of available Bluetooth devices
//     // You can display them in a list and let the user select a device
//     this.showAlert('Called succesfully')
//     this.bluetoothList=devices
//     this.showAlert(this.bluetoothList.toString())
//     console.log('Available Bluetooth Devices:', devices);
//   }).catch((error) => {
//     this.showAlert('Error listing Bluetooth devices')
//     console.log('Error listing Bluetooth devices', error);
//   });
// }
// connectAndPrint() {
//   this.bluetoothSerial.connect(this.selectedPrinter).subscribe(() => {
//     console.log('Connected to printer');

//     // Send data to the printer
//     const data = 'Hello, printer!';
//     this.bluetoothSerial.write(data).then(() => {
//       console.log('Data sent to printer');
//     }).catch((error) => {
//       this.showAlert('Data sent to printer')
//       console.log('Error sending data to printer', error);
//     });
//   }, (error) => {
//     this.showAlert('Error connecting to printer')
//     console.log('Error connecting to printer', error);
//   });
// }

// requestBluetoothPermissions() {
//   this.showAlert('requestBluetoothPermissions called')
//   this.androidPermissions.requestPermissions([
//     this.androidPermissions.PERMISSION.BLUETOOTH,
//     this.androidPermissions.PERMISSION.BLUETOOTH_ADMIN,
//     this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION
//   ]);
// }
// checkBluetoothPermissions() {
//   this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.BLUETOOTH).then((result) => {
//     if (result.hasPermission) {
//       // Permission granted
//       // Proceed with Bluetooth operations
//       this.requestBluetoothPermissions();
//       this.showAlert('granted')
//     } else {
//       // Permission denied
//       // Request the permissions
//       this.showAlert('not granted ')
//       this.requestBluetoothPermissions();
//     }
//   }).catch((error) => {
//     this.showAlert('Error checking Bluetooth permission')
//     console.log('Error checking Bluetooth permiss ion', error);
//   });
// } /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                 ////for web with api///////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async login() {
    // Retrieve the stored data from native storage
    console.log( this.nativeStorage.keys())
    const k= this.nativeStorage.getItem(this.loginEmail)
    console.log(k)
    console.log(this.nativeStorage.getItem('logStatus'))
    
    this.nativeStorage.getItem(this.loginEmail)
      .then(data => {
        if (data.password === this.loginPassword) {
          this.loggedin = true;
        } else {
          console.log('Invalid credentials.');
        }
      })
      .catch(error => console.error('Error retrieving data:', error));
  }
  //////////////////////////////////////////////////////////////////////////////android////////////////////////////

  displayValue(value: any): void {
    this.bleservice.connect
    alert('Value: ' + value);
  }


  
  getKeys(data: any): string[] {
    return Object.keys(data);
  }

  onConnect(deviceId: any) {
    this.bleservice.connect(
      deviceId,
      () => {
        console.log('Connected to device:', deviceId);
        this.selectedDevice = deviceId
        this.showAlert('succesfully connected')
      },
      (error:any) => {
        console.error('Connection error:', error);
        this.showAlert(error)
      }
    );
  }

  onPrint() {
    let data='hureeeee'
    this.bleservice.print(
      this.selectedDevice,
      data,
      () => {
        console.log('Data sent to device:', data);
        this.showAlert('succesfully connected')
      },
      (error:any) => {
        console.error('Data send error:', error);
        this.showAlert(error)
      }
    );
  }


 }
