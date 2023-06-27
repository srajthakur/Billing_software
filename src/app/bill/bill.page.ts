import { Component, ViewChild,ElementRef,OnInit,Renderer2,AfterViewInit } from '@angular/core';
import { MatTableDataSource , MatTableModule} from '@angular/material/table';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { MatIconModule } from '@angular/material/icon';

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
  billNumber: number=0;
  items: any[]; // Replace with your actual data structure
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['itemCode', 'itemName', 'price', 'quantity', 'totalPrice','actions'];
  totalItems: number;
  totalQuantity: number;
  totalAmount: number;
  paymentMethod: string;
  isAddButtonClicked: boolean;
  isUpdateButtonClicked:boolean;
  itemcode:string;
  itemquandity:string;
  tableData :MyObject[]=[];
  today : Date;
  dateString: string; 
  dailyData :{}={}
  stashed:boolean=false
  updateBillNumber:any=''
  generateUpdateBill : boolean =false


  

  constructor(private navCtrl:NavController ,private nativeStorage:NativeStorage,private AlertController:AlertController,private renderer: Renderer2) { 

    this.today = new Date();
    this.dateString = this.today.toJSON().slice(0, 10); 
    this.phoneNumber = '';
    this.name = '';
    this.items = []; // Initialize with your data
    this.dataSource = new MatTableDataSource(this.tableData);
    this.totalItems = 0;
    this.totalQuantity = 0;
    this.totalAmount = 0;
    this.paymentMethod = '';
    this.isAddButtonClicked =false;
    this.isUpdateButtonClicked=false;
    this.itemcode='';
    this.itemquandity='';
    this.todayDateInStorage()
    this.nativeStorage.getItem(this.dateString).then(data=>{
    console.log(data)
    this.billNumber = data.length
    
    })
  }

  focusNameField() {
    const nameInput = document.querySelector('#nameInput') as HTMLInputElement;
    nameInput.focus();
  }


  ngOnInit() {
    
  }

  async stashShowAlert() {
    const alert = await this.AlertController.create({
      header: 'You are currently making a bill unstashing old bill this time bill delete current bill data',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'continue',
          handler: (data) => {
            this.nativeStorage.getItem('stash').then(data=>{
              this.unstash(data)
            })}}]
    });
  
    await alert.present();
  }
  
  async showAlert(message:any) {
    const alert = await this.AlertController.create({
      message: message,
      buttons: ['OK']
    });  await alert.present();
  }
  changeQuantity(item: any) {
    // Logic to change quantity for the selected item

    item['totalPrice'] = item['quantity'] * item['price']

    this.total_fun()
  }

  addItem() {
    // Logic to add an item to the list
    this.isAddButtonClicked =!this.isAddButtonClicked;
    if (parseInt(this.itemcode)<=10000 && this.isAddButtonClicked==false){
      for(let i=0;i<this.tableData.length;i++){
        if (this.tableData[i].itemCode == this.itemcode){
                this.itemquandity = (parseInt( this.itemquandity)+ parseInt( this.tableData[i].quantity)).toString()
                this.tableData.splice(i,1)
                break
        }
      }
      this.tableData.push( { itemCode: this.itemcode, itemName: 'Manual', price: this.itemcode, quantity: this.itemquandity,totalPrice:parseInt(this.itemquandity)*parseInt(this.itemcode)  })
      this.dataSource = new MatTableDataSource(this.tableData)
      this.itemcode='';
      this.itemquandity='';
      this.total_fun()
    }
   
  }

  stashBill(status:string) {

    if (status == 'stash' && this.stashed == false ){
      this.nativeStorage.setItem('stash',{
        'tableData':this.tableData,
        'name' : this.name,
        'number' : this.phoneNumber,
        'totalQuantity': this.totalQuantity,
        'totalAmount': this.totalAmount,
        'totalItems':  this.totalItems
        
        
      })
      this.stashed=!this.stashed
      this.clearItems()
    }
    else if  (status == 'unstash' && this.stashed == true){
      
      if (this.tableData.length>0){
        this.stashShowAlert()
      }
      else{
        console.log('inelse')
      this.nativeStorage.getItem('stash').then(data=>{
         this.unstash(data)
      })

    }
  }
    
  }

  unstash(data:any){
    this.tableData=data.tableData
    this.name = data.name
    this.phoneNumber=data.number
    this.totalQuantity=data.totalQuantity
    this.totalAmount=data.totalAmount
    this.totalItems=data.totalItems
   this.nativeStorage.remove('stash')
   this.dataSource = new MatTableDataSource(this.tableData)
   this.stashed=!this.stashed
  }

  updateItems() {
    this.isUpdateButtonClicked = true;
  }

  clearItems() {
    
    this.phoneNumber = '';
    this.name = '';
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
    this.nativeStorage.getItem(this.dateString).then(data=>{
    this.billNumber = data.length
    this.generateUpdateBill = false
    this.updateBillNumber = 0
    
    })

  }
  total_fun(){
    this.totalItems = this.tableData.length
    this.totalQuantity=0
    this.totalAmount=0
    if (this.totalItems > 0){
    this.tableData.forEach((item) => {
      this.totalQuantity = this.totalQuantity +  parseInt( item.quantity);
      this.totalAmount = this.totalAmount + item.totalPrice;
    })}
  }

  generateBill() {
    console.log(this.dateString)
    if (!this.generateUpdateBill){
    if (this.name=='' ){
   this.showAlert('Please enter name.')
    }
    else if (this.phoneNumber==''){
      this.showAlert('Please enter number.')

    }
    else if (this.phoneNumber.length!=10 && this.phoneNumber.length!=13){
      this.showAlert('Number should be of 10 digit or for USA customer it should be of 13 digit.')
    }
    else{

    
    this.nativeStorage.getItem('customer').then(data=>{
      
      data[this.phoneNumber]=this.name

      this.nativeStorage.setItem('customer',data)

      this.nativeStorage.getItem(this.dateString).then(data=>{
        const indata = {
        'tabledata'     : this.tableData,
        'name'          : this.name,  
        'number'        : this.phoneNumber,
        'totalQuantity' : this.totalQuantity,
        'totalAmount'   : this.totalAmount,
        'totalItems'    : this.totalItems,
        'paymentMethod' : this.paymentMethod
        }
        data[data.length]=indata  
        console.log(data)
        this.nativeStorage.setItem(this.dateString,data)
        
        this.clearItems()
      })
    }).catch(error=>('error in retriving customer'))

  }}
  else if (this.generateUpdateBill){
    this.nativeStorage.getItem(this.dateString).then(data=>{
      const indata = {
      'tabledata'     : this.tableData,
      'name'          : this.name,  
      'number'        : this.phoneNumber,
      'totalQuantity' : this.totalQuantity,
      'totalAmount'   : this.totalAmount,
      'totalItems'    : this.totalItems,
      'paymentMethod' : this.paymentMethod
      }
      data[this.updateBillNumber]=indata
      console.log(data)
      this.nativeStorage.setItem(this.dateString,data)
      
      this.clearItems()
    })}

  }
  todayDateInStorage(){
    console.log(this.today)
    console.log(this.dateString)
    this.nativeStorage.getItem(this.dateString).then(data=>{
      console.log('date already created succesfully')
      // this.nativeStorage.setItem('customer', {})
      
    }).catch(data=>{
      this.nativeStorage.setItem(this.dateString, [{}])
      this.billNumber = 1
      console.log('date created succesfully')
    })

   
  }

  removeItem(item:any){
    console.log(item)
    for(let i=0;i<this.tableData.length;i++){
      console.log(this.tableData[i])
      console.log(this.tableData[i].itemCode,item.itemCode)
      console.log(typeof this.tableData[i].itemCode,typeof item.itemCode)
      if (parseInt( this.tableData[i].itemCode) ==parseInt(item.itemCode)){
              console.log('inside')
              this.tableData.splice(i,1)
              this.dataSource = new MatTableDataSource(this.tableData);
              this.total_fun()
              break
      }
    }
  }
  dataForUpdateBill(){
    this.isUpdateButtonClicked=false
    this.nativeStorage.getItem(this.dateString).then(allData=>{
      const data = allData[this.updateBillNumber] 
      console.log(allData)
      console.log(allData.length)
      console.log(data['tabledata'])

      if (allData.length-1 >= this.updateBillNumber && this.updateBillNumber>0)
       
       this.tableData=data['tabledata']
       this.name = data['name']
       this.phoneNumber=data['number']
       this.totalQuantity=data['totalQuantity']
       this.totalAmount=data['totalAmount']
       this.totalItems=data['totalItems']
      this.dataSource = new MatTableDataSource(this.tableData)
      this.generateUpdateBill = true
    })
  }
back(){
  this.isAddButtonClicked=false
  this.isUpdateButtonClicked=false
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
    this.nativeStorage.setItem('logStatus','Logout')
    console.log(this.nativeStorage.getItem('logStatus'))
    this.navCtrl.navigateForward('')
  }
}

}










