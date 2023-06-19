import { Component, OnInit } from '@angular/core';
import { MatTableDataSource , MatTableModule} from '@angular/material/table';
interface MyObject {
  itemCode:string, 
  itemName:string, 
  price:string, 
  quantity:string, 
  totalPrice:number;
}

@Component({
  selector: 'app-bill',
  templateUrl: './bill.page.html',
  styleUrls: ['./bill.page.scss'],
})
export class BillPage implements OnInit {


  phoneNumber: string;
  name: string;
  billNumber: string;
  items: any[]; // Replace with your actual data structure
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['itemCode', 'itemName', 'price', 'quantity', 'totalPrice'];
  totalItems: number;
  totalQuantity: number;
  totalAmount: number;
  paymentMethod: string;
  isAddButtonClicked: boolean;
  itemcode:string;
  itemquandity:string;
  tableData :MyObject[]=[]
  

  constructor() { 

    this.phoneNumber = '';
    this.name = '';
    this.billNumber = '';
    this.items = []; // Initialize with your data
    this.dataSource = new MatTableDataSource(this.tableData);

    this.totalItems = 0;
    this.totalQuantity = 0;
    this.totalAmount = 0;
    this.paymentMethod = '';
    this.isAddButtonClicked =false;
    this.itemcode='';
    this.itemquandity='';
  }

  ngOnInit() {
  }

  

  changeQuantity(item: any) {
    // Logic to change quantity for the selected item
    console.log(this.tableData)
    console.log(item['quantity'] , item['price'],item['quantity'] * item['price'])
    item['totalPrice'] = item['quantity'] * item['price']
    console.log(item)
    console.log(this.tableData)
    this.total_fun()
  }

  addItem() {
    // Logic to add an item to the list
    this.isAddButtonClicked =!this.isAddButtonClicked;
    if (parseInt(this.itemcode)<=10000 && this.isAddButtonClicked==false){
      this.tableData.push( { itemCode: this.itemcode, itemName: 'Manual', price: this.itemcode, quantity: this.itemquandity,totalPrice:parseInt(this.itemquandity)*parseInt(this.itemcode)  })
      this.dataSource = new MatTableDataSource(this.tableData)
      this.itemcode='';
      this.itemquandity='';
      this.total_fun()
    }
    console.log(this.tableData)
  }

  stashItems() {
    // Logic to stash items
  }

  updateItems() {
    // Logic to update items
  }

  clearItems() {
    this.phoneNumber = '';
    this.name = '';
    this.billNumber = '';
    this.items = []; // Initialize with your data
    this.tableData=[]
    this.dataSource = new MatTableDataSource(this.tableData);

    this.totalItems = 0;
    this.totalQuantity = 0;
    this.totalAmount = 0;
    this.paymentMethod = '';
    this.isAddButtonClicked =false;
    this.itemcode='';
    this.itemquandity='';
  
  }
  total_fun(){
    this.totalItems = this.tableData.length
    
    // for (const item of this.tableData) {
    //   this.totalQuantity = item['quantity']
    // }
    console.log('im')
    this.tableData.forEach((item) => {
      this.totalQuantity = this.totalQuantity +  parseInt( item.quantity);
      this.totalAmount = this.totalAmount + item.totalPrice;
    })
  }

  generateBill() {
    // Logic to generate the bill based on the selected payment method
  }

}










