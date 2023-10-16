import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { MatTableDataSource , MatTableModule} from '@angular/material/table';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { MaxLengthValidator } from '@angular/forms';
import { Data } from '@angular/router';

interface MyObject {
  'productCode' : string,
  'productName' : string,
  'productPrice': string
}

@Component({
  selector: 'app-rate',
  templateUrl: 'rate.page.html',
  styleUrls: ['rate.page.scss'],
})

export class RatePage {
  tableData: MyObject[] = [] // Array to store products
  dataSource :  MatTableDataSource<any>
  productName : string=''
  productPrice : string=''
  code:any=''
  printQ:any=1

  newCustomProduct: any = {
    code: '',
    name: '',
    price: ''
  
  }; // Object to store new custom product inputs

  displayedColumns: string[] = ['code', 'name', 'price','action']; 
  constructor(private apiservices:ApiService, private navCtrl: NavController,private nativeStorage:NativeStorage,private AlertController:AlertController,) {
    this.dataSource = new MatTableDataSource(this.tableData)
    this.nativeStorage.getItem('rate').then(data=>{
      console.log('date already created succesfully')
      // this.nativeStorage.setItem('customer', {})
      this.getdata()
      
    }).catch(data=>{
      this.nativeStorage.setItem('rate', [{}])
      console.log('rate created succesfully')
    })
    


    
    
  }

  addProduct() {
    if (this.productName && this.productPrice)
 {    this.nativeStorage.getItem('rate').then(data=>{
      console.log(data)
      console.log(this.productName,this.productPrice)
    this.nativeStorage.getItem('barcode').then(code=>{
 
   console.log('codeeeeeeeeeeeeeeeeee',code)
   code = code + 1
   console.log(code)
   this.nativeStorage.setItem('barcode',code)

   code = code.toString();  
   console.log(code,typeof code)
   const indata = {
    'productCode' : code,
    'productName' : this.productName,
    'productPrice': this.productPrice
  }
  console.log(indata)
  data.push(indata)
  console.log(data)
  this.nativeStorage.setItem('rate',data)
  data.splice(0,1)
  this.dataSource = new MatTableDataSource(data)
  this.tableData=data
  this.productPrice = '';
  this.productName = '';
   
})

    
      
     })}
    // Reset new product inputs

  }

  addCustomProduct() {
    if (this.newCustomProduct.code && this.newCustomProduct.name && this.newCustomProduct.price)
 {    this.nativeStorage.getItem('rate').then(data=>{
      console.log(data)
      for(let i = 1; i<data.length;i++){
         let temp =data[i]
         console.log(temp)
         if(temp['productCode'] == this.newCustomProduct.code){
          data.splice(i,1)
         }
      }
     const indata = {
        'productCode' : this.newCustomProduct.code,
        'productName' : this.newCustomProduct.name,
        'productPrice': this.newCustomProduct.price
      }
      console.log(indata)
      data.push(indata)
      console.log(data)
      this.nativeStorage.setItem('rate',data)
      data.splice(0,1)
      this.dataSource = new MatTableDataSource(data)
      this.tableData=data
      this.newCustomProduct.code = '';
      this.newCustomProduct.name = '';
      this.newCustomProduct.price = '';
      
     })}

  }

//  async generateProductCode() {
  
// this.nativeStorage.getItem('barcode').then(data=>{
//    this.code = data
//    console.log(data,this.code)
//    this.code = this.code + 1
//    console.log(this.code)
//    this.nativeStorage.setItem('barcode',this.code)

//    this.code = this.code.toString();  
//    console.log(this.code,typeof this.code)
   
// })
//     return this.code
//   }


  navFun(data:string){
    if (data == 'BILL'){
      this.navCtrl.navigateForward('/bill')
    }
    else if (data == 'RATE'){
      this.navCtrl.navigateForward('/rate')
    }
    else if (data == 'SETTLEMENT'){
      this.navCtrl.navigateForward('/settlement')
    }
    else if (data == 'SETTING'){
      this.navCtrl.navigateForward('/setting')
    }
    else if (data == 'CUSTOMER'){
      this.navCtrl.navigateForward('/customer')
    }
    else if (data == 'LOGOUT'){
      console.log(this.nativeStorage.getItem('logStatus'))
      this.nativeStorage.setItem('logStatus','Logout')
      this.navCtrl.navigateForward('/landing')
    }
  }
async  getdata(){
  setTimeout(() => {
    this.nativeStorage.getItem('rate').then(data=>{
      console.log(data)
      data.splice(0,1)
      this.tableData = data
      this.dataSource = new MatTableDataSource(this.tableData)
    })
  }, 2000);

  }
  async deleteShowAlert(code:any) {
    const alert = await this.AlertController.create({
      header: 'Are you sure ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'delete',
          handler: (dta) => {
   


            this.nativeStorage.getItem('rate').then(data=>{
              console.log(data)
              for(let i = 1; i<data.length;i++){
                 let temp =data[i]
                 console.log(temp,code)
                 console.log(temp['productCode'] == code)
                 if(temp['productCode'] == code){
                  console.log('innnnnnnnnnnn')
                  data.splice(i,1)
                  this.nativeStorage.setItem('rate',data)
                  data.splice(0,1)
                  this.dataSource = new MatTableDataSource(data)
                  
                  this.tableData=data
                 }
              }

              
             })


          }
        }
        ]
    });
  
    await alert.present();
  }
delete(data:any){
this.deleteShowAlert(data)
}
print(data:any){
  
this.apiservices.printLabel({'barcode':data,'printQ':this.printQ}).subscribe(
  (response) => {
    // Handle the response from the server after printing the settlement
    this.printQ=1
    console.log('Printing response:', response);
  },
  (error) => {
    console.error('Error printing settlement:', error);
  }
);
}
}
