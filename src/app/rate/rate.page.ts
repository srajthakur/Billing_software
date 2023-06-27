import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { MatTableDataSource , MatTableModule} from '@angular/material/table';

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
  productName : string='dd'
  productPrice : string='dd '

  newCustomProduct: any = {
    code: '',
    name: '',
    price: ''
  
  }; // Object to store new custom product inputs

  displayedColumns: string[] = ['code', 'name', 'price']; 
  constructor(private navCtrl: NavController,private nativeStorage:NativeStorage) {
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
     const indata = {
        'productCode' : this.generateProductCode(),
        'productName' : this.productName,
        'productPrice': this.productPrice
      }
      console.log(indata)
      data.push(indata)
      console.log(data)
      this.nativeStorage.setItem('rate',data)
      this.dataSource = new MatTableDataSource(data)
      this.tableData=data
      this.productPrice = '';
      this.productName = '';
      
     })}
    // Reset new product inputs

  }

  addCustomProduct() {
    if (this.newCustomProduct.code && this.newCustomProduct.name && this.newCustomProduct.price)
 {    this.nativeStorage.getItem('rate').then(data=>{
      console.log(data)
      console.log(this.productName,this.productPrice)
     const indata = {
        'productCode' : this.newCustomProduct.code,
        'productName' : this.newCustomProduct.name,
        'productPrice': this.newCustomProduct.price
      }
      console.log(indata)
      data.push(indata)
      console.log(data)
      this.nativeStorage.setItem('rate',data)
      this.dataSource = new MatTableDataSource(data)
      this.tableData=data
      this.newCustomProduct.code = '';
      this.newCustomProduct.name = '';
      this.newCustomProduct.price = '';
      
     })}

  }

  generateProductCode() {
      const constantPart = "123456"; // Replace with your desired constant value
      const dataLength = this.tableData.length.toString();
      const remainingLength = 13 - constantPart.length - dataLength.length;
      const code = constantPart + "0".repeat(remainingLength) + dataLength;
      return code;
    
  }

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
      this.tableData = data
      this.dataSource = new MatTableDataSource(this.tableData)
    })
  }, 2000);

  }
}
