import { Component ,OnInit} from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { NavController } from '@ionic/angular';
import { MatTableDataSource ,MatTableModule} from '@angular/material/table';
interface MyObject {
  'number' : string,
  'name' : string,

}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.page.html',
  styleUrls: ['./customer.page.scss'],
})


export class CustomerPage  {
  displayedColumns: string[] = ['phoneNumber', 'name', 'actions'];
  customerData: { [key: string]: string }[] = [];
  dataSource :  MatTableDataSource<any>;
  tableData :MyObject[]=[]
  totalContacts:number=0
  

  constructor(private nativeStorage: NativeStorage,private navCtrl: NavController) {
    this.dataSource=new MatTableDataSource(this.tableData)
    this.loadCustomerData();
  }

  

  loadCustomerData() {
    console.log("called")
    this.nativeStorage.getItem('customer')
      .then(data => {
        console.log(data)
        this.tableData=[]
        for (const key in data) {
          console.log(key); // 'key1', 'key2'
          this.tableData.push({'number':key,"name":data[key]}) 
        }
        console.log(this.tableData)
        this.totalContacts = this.tableData.length

        // for(let i=0;i<data.length;i++){
        //   this.tableData.push({"number":data[0]})
        // }
  
        this.dataSource = new MatTableDataSource(this.tableData);
      })
      .catch(error => {
        console.error('Error retrieving customer data:', error);
      });
  }

  deleteCustomer(phoneNumber: string) {
    this.nativeStorage.getItem('customer')
      .then(data => {
        delete data[phoneNumber];
        this.nativeStorage.setItem('customer', data)
          .then(() => {
            console.log('Customer deleted successfully');
            this.loadCustomerData(); // Refresh the data after deletion
          })
          .catch(error => {
            console.error('Error deleting customer:', error);
          });
      })
      .catch(error => {
        console.error('Error retrieving customer data:', error);
      });
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
}
