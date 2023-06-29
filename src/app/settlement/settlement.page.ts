import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { MatTableDataSource ,MatTableModule} from '@angular/material/table';
import { PrintService } from '../services/print.service';

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

  constructor(private navCtrl: NavController,private nativeStorage:NativeStorage,private printservice: PrintService) {
    this.dataSource = new MatTableDataSource(this.tableData)  
    this.getData()
    this.viewBill='daySale'
  }



  settle(date:any) {
    
  
  }

  viewDaySale(date:any) {
    const td=[{}]
    
    console.log('dsl;jjfgg;jk')
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
  print(date:any){
         this.printservice.searchBluetoothPrinter().then(data=>{
          this.bluetoothList=data
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
     this.printservice.sendToBluetoothPrinter(this.selectedPrinter,myText);
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
  
  
}
