import { Component, ViewChild, ElementRef, OnInit, Renderer2, AfterViewInit, HostListener, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { NavController, IonInput } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { MatIconModule } from '@angular/material/icon';
import { GoogleDriveService } from '../services/drive.service';
import { ApiService } from '../services/api.service';
import { fromEvent } from 'rxjs';
import { buffer, debounceTime, map, filter } from 'rxjs/operators';

interface MyObject {
  itemCode: string,
  itemName: string,
  price: string,
  quantity: string,
  totalPrice: number;
}

@Component({
  selector: 'app-bill',
  templateUrl: './bill.page.html',
  styleUrls: ['./bill.page.scss'],
})

export class BillPage implements OnInit {
  @ViewChild('codeItem', { static: true }) myInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('input1', { static: false }) input1: IonInput | undefined
  @ViewChild('input2', { static: false }) input2: IonInput | undefined
  phoneNumber: string;
  name: any;
  barcode: string
  billNumber: number = 1;
  items: any[]; // Replace with your actual data structure
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['itemCode', 'itemName', 'price', 'quantity', 'totalPrice', 'actions'];
  totalItems: number;
  totalQuantity: number;
  totalAmount: number;
  paymentMethod: string;
  isEditButtonClicked: boolean;
  isUpdateButtonClicked: boolean;
  itemcode: string;
  itemquandity: string;
  tableData: MyObject[] = [];
  today: Date;
  dateString: string;
  dailyData: {} = {}
  stashed: boolean = false
  updateBillNumber: any = ''
  generateUpdateBill: boolean = false
  rate: any
  options: string[] = []
  customerData: any
  filteredOptions: string[]
  selectedIndex: any
  selectedOption: string | null = null;
  inputDisable: boolean
  isBill: boolean

  searchQuery: string = '';
  contactNumbers: string[] = ['7012345678', '7023456789', '7134567890', '9897174115'];





  constructor(
    private apiService: ApiService,
    private navCtrl: NavController,
    private nativeStorage: NativeStorage,
    private AlertController: AlertController,
    private renderer: Renderer2,
    private googleDriveService: GoogleDriveService,
    private cdr: ChangeDetectorRef,
    private elementRef: ElementRef) {


    this.inputDisable = false
    this.isBill = false
    this.barcode = ''
    this.today = new Date();
    this.dateString = this.today.toJSON().slice(0, 10);
    this.phoneNumber = '';
    this.name = '';
    this.items = []; // Initialize with your data
    this.dataSource = new MatTableDataSource(this.tableData);
    this.isEditButtonClicked = false
    this.totalItems = 0;
    this.totalQuantity = 0;
    this.totalAmount = 0;
    this.paymentMethod = '';
    this.isUpdateButtonClicked = false;
    this.itemcode = '';
    this.itemquandity = '1';
    this.selectedIndex = -1;
    this.todayDateInStorage()
    this.nativeStorage.getItem(this.dateString).then(data => {
      console.log(data)
      if (data.length) {
        this.billNumber = data.length
      }

      this.nativeStorage.getItem('rate').then(data => {
        this.rate = data
      })

    })
    this.authorize()
    setTimeout(() => {
      this.nativeStorage.getItem('customer').then(data => {
        this.customerData = data
        console.log(this.customerData)
        for (const key in data) {
          console.log(key); // 'key1', 'key2'
          this.options.push(key)
        }


        console.log(this.options)
      })
    }, 15000)


    this.filteredOptions = [];
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent, index: number, option: string) {

    // Check if the key pressed is "F1"
    if (event.key === 'Escape') {
      // Prevent the default browser behavior for the F1 key press
      event.preventDefault();
      if (this.paymentMethod == '' || this.paymentMethod == 'upi') {
        this.paymentMethod = 'cash'
      }
      else if (this.paymentMethod == 'cash') {
        this.paymentMethod = 'card'
      }
      else if (this.paymentMethod == 'card') {
        this.paymentMethod = 'upi'
      }
      this.addItem();
    } else if (this.paymentMethod && this.totalItems > 0 && event.key === ' ') {
      console.log('generate.button')
      event.preventDefault(); // Prevent the default browser behavior for ESC key press
      this.generateBill();
    }
    else if (this.filteredOptions.length > 0 && event.key === 'ArrowDown') {
      console.log('generate.button')
      event.preventDefault(); // Prevent the default browser behavior for ESC key press
      // this.navigateOptions('down');
    }
    else if (this.filteredOptions.length > 0 && event.key === 'Enter') {
      console.log('generate.button')
      event.preventDefault(); // Prevent the default browser behavior for ESC key press
      this.onEnterKey(option)

    }
    else if (!this.isUpdateButtonClicked && !this.isEditButtonClicked && this.inputDisable == true && ((event.key >= '0' && event.key <= '9') || event.key == 'Backspace')) {
      console.log('generate called')
      event.preventDefault();
      if (event.key == 'Backspace') {
        this.barcode = this.barcode.slice(0, -1)
        this.itemcode = this.barcode
      }
      else {
        this.barcode += event.key  // Prevent the default browser behavior for ESC key press
        console.log(this.barcode)
        if (this.barcode.length == 13) {
          console.log(this.barcode, 'innnnnnnnnnnnnnnn')
          this.barcode_reader()

        }
        this.itemcode = this.barcode
      }
      // setTimeout(() => {
      //   console.log("Delayed function executed");
      //   this.barcode=''
      // }, 1000);  
    }
    else if (this.inputDisable == false && this.isBill == false && this.name && event.key == 'Enter' && this.checkPhoneNumber(this.phoneNumber)) {
      this.isBill = true
      this.inputDisable = true
    }
    else if (!this.isEditButtonClicked && this.itemcode && this.inputDisable == true && event.key == 'Enter') {
      this.addItem()
    }

  }

  focusNext(nextInput: IonInput) {
    nextInput.setFocus();
  }

  checkPhoneNumber(number: any) {

    if (number.length == 10 || number.length == 13) {
      return true
    }
    this.showAlert('Number should be of 10 digit or for USA customer it should be of 13 digit.')
    return false
  }

  barcode_reader() {
    if (this.inputDisable == true && this.isBill == true && this.barcode.length == 13) {
      console.log('in br', this.barcode)

      this.itemcode = this.barcode
      this.barcode = ''
      this.addItem();
    }
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
            this.nativeStorage.getItem('stash').then(data => {
              this.unstash(data)
            })
          }
        }]
    });

    await alert.present();
  }

  async showAlert(message: any) {
    const alert = await this.AlertController.create({
      message: message,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            if (this.isBill == false) {
              setTimeout(() => {
                this.input1?.setFocus()
              }, 500)

            }
          }
        }
      ]
    }); await alert.present();

  }

  changeQuantity(item: any) {
    // Logic to change quantity for the selected item

    item['totalPrice'] = item['quantity'] * item['price']

    this.total_fun()
  }

  async addItem() {
    // Logic to add an item to the list
    this.barcode = ''
    if (this.myInputRef) {
      this.myInputRef.nativeElement.focus();
    }
    console.log('in additem', this.addItem)

    if (parseInt(this.itemcode) <= 10000) {
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].itemCode == this.itemcode) {
          this.itemquandity = (parseInt(this.itemquandity) + parseInt(this.tableData[i].quantity)).toString()
          this.tableData.splice(i, 1)
          break
        }
      }
      this.tableData.push({ itemCode: this.itemcode, itemName: 'Manual', price: this.itemcode, quantity: this.itemquandity, totalPrice: parseInt(this.itemquandity) * parseInt(this.itemcode) })
      this.dataSource = new MatTableDataSource(this.tableData)
      this.itemcode = '';
      this.itemquandity = '1';
      this.total_fun()
    }
    else {
      console.log('in additem else', this.addItem)
      for (let i = 0; i < this.rate.length; i++) {
        if (this.rate[i].productCode == this.itemcode) {
          let inprice = this.rate[i].productPrice
          this.tableData.push({ itemCode: this.itemcode, itemName: 'Manual', price: inprice, quantity: this.itemquandity, totalPrice: parseInt(this.itemquandity) * parseInt(inprice) })
          this.dataSource = new MatTableDataSource(this.tableData)
          this.itemcode = '';
          this.itemquandity = '1';
          this.total_fun()
          break
        }
      }
    }

  }

  stashBill(status: string) {

    if (status == 'stash' && this.stashed == false) {
      this.nativeStorage.setItem('stash', {
        'tableData': this.tableData,
        'name': this.name,
        'number': this.phoneNumber,
        'totalQuantity': this.totalQuantity,
        'totalAmount': this.totalAmount,
        'totalItems': this.totalItems


      })
      this.stashed = !this.stashed
      this.clearItems()
    }
    else if (status == 'unstash' && this.stashed == true) {

      if (this.tableData.length > 0) {
        this.stashShowAlert()
      }
      else {
        console.log('inelse')
        this.nativeStorage.getItem('stash').then(data => {
          this.unstash(data)
        })

      }
    }

  }

  unstash(data: any) {
    this.tableData = data.tableData
    this.name = data.name
    this.phoneNumber = data.number
    this.totalQuantity = data.totalQuantity
    this.totalAmount = data.totalAmount
    this.totalItems = data.totalItems
    this.nativeStorage.remove('stash')
    this.dataSource = new MatTableDataSource(this.tableData)
    this.stashed = !this.stashed
  }

  updateItems() {
    this.isUpdateButtonClicked = true;
  }

  clearItems() {
    this.inputDisable = false
    this.saveData()
    this.phoneNumber = '';
    this.name = '';
    this.items = []; // Initialize with your data
    this.tableData = []
    this.dataSource = new MatTableDataSource(this.tableData);
    this.totalItems = 0;
    this.totalQuantity = 0;
    this.totalAmount = 0;
    this.paymentMethod = '';
    this.itemcode = '';
    this.itemquandity = '1';
    this.nativeStorage.getItem(this.dateString).then(data => {
      this.billNumber = data.length
      this.generateUpdateBill = false
      this.updateBillNumber = 0
      this.isBill = false
      this.isEditButtonClicked = false
      setTimeout(() => {
        this.input1?.setFocus()
      }, 500);


    })

  }
  total_fun() {
    this.totalItems = this.tableData.length
    this.totalQuantity = 0
    this.totalAmount = 0
    if (this.totalItems > 0) {
      this.tableData.forEach((item) => {
        this.totalQuantity = this.totalQuantity + parseInt(item.quantity);
        this.totalAmount = this.totalAmount + item.totalPrice;
      })
    }
  }

  generateBill() {
    this.today = new Date();
    this.dateString = this.today.toJSON().slice(0, 10);
    console.log(this.dateString)
    if (!this.generateUpdateBill) {
      if (this.name == '') {
        this.showAlert('Please enter name.')
      }
      else if (this.phoneNumber == '') {
        this.showAlert('Please enter number.')

      }
      else if (this.phoneNumber.length != 10 && this.phoneNumber.length != 13) {
        this.showAlert('Number should be of 10 digit or for USA customer it should be of 13 digit.')
      }
      else {


        this.nativeStorage.getItem('customer').then(data => {

          data[this.phoneNumber] = this.name

          this.nativeStorage.setItem('customer', data)
          this.customerData = data
          if (!(this.options.includes(this.phoneNumber))) {
            this.options.push(this.phoneNumber)
          }


        }).catch(data => {

          this.nativeStorage.setItem('customer', {})
          this.showAlert('error customer')
        })

        this.nativeStorage.getItem(this.dateString).then(data => {
          const indata = {
            'tabledata': this.tableData,
            'name': this.name,
            'number': this.phoneNumber,
            'totalQuantity': this.totalQuantity,
            'totalAmount': this.totalAmount,
            'totalItems': this.totalItems,
            'paymentMethod': this.paymentMethod,
            'billNumber': this.billNumber
          }
          data[data.length] = indata
          console.log(data)
          this.nativeStorage.setItem(this.dateString, data).then(() => {
            this.apiService.printBill(indata).subscribe(
              (response) => {
                // Handle the response from the server after printing the settlement
                console.log('Printing response:', response);
              },
              (error) => {
                console.error('Error printing settlement:', error);
              }
            );
          })

          this.clearItems()
        }).catch(data => {
          this.nativeStorage.setItem(this.dateString, [{}])
          this.showAlert('error')
        })

      }
    }
    else if (this.generateUpdateBill) {
      this.nativeStorage.getItem(this.dateString).then(data => {
        const indata = {
          'tabledata': this.tableData,
          'name': this.name,
          'number': this.phoneNumber,
          'totalQuantity': this.totalQuantity,
          'totalAmount': this.totalAmount,
          'totalItems': this.totalItems,
          'paymentMethod': this.paymentMethod,
          'billNumber': this.updateBillNumber
        }

        data[this.updateBillNumber] = indata
        console.log(data)
        this.nativeStorage.setItem(this.dateString, data).then(() => {

          this.apiService.printBill(indata).subscribe(
            (response) => {
              // Handle the response from the server after printing the settlement
              console.log('Printing response:', response);
            },
            (error) => {
              console.error('Error printing settlement:', error);
            }
          );
        })

        this.clearItems()
      })
    }

  }
  todayDateInStorage() {
    console.log(this.today)
    console.log(this.dateString)
    this.nativeStorage.getItem(this.dateString).then(data => {
      console.log('date already created succesfully')
      // this.nativeStorage.setItem('customer', {})
      //this.showAlert('Welcome')

    }).catch(data => {
      this.nativeStorage.setItem(this.dateString, [{}])
      this.billNumber = 1
      this.showAlert('error')
      console.log('date created succesfully')
    })


  }

  removeItem(item: any) {
    console.log(item)
    for (let i = 0; i < this.tableData.length; i++) {
      console.log(this.tableData[i])
      console.log(this.tableData[i].itemCode, item.itemCode)
      console.log(typeof this.tableData[i].itemCode, typeof item.itemCode)
      if (parseInt(this.tableData[i].itemCode) == parseInt(item.itemCode)) {
        console.log('inside')
        this.tableData.splice(i, 1)
        this.dataSource = new MatTableDataSource(this.tableData);
        this.total_fun()
        break
      }
    }
  }
  dataForUpdateBill() {
    this.isUpdateButtonClicked = false
    this.nativeStorage.getItem(this.dateString).then(allData => {
      const data = allData[this.updateBillNumber]
      console.log(allData)
      console.log(allData.length)
      console.log(data['tabledata'])

      if (allData.length - 1 >= this.updateBillNumber && this.updateBillNumber > 0)

        this.tableData = data['tabledata']
      this.name = data['name']
      this.phoneNumber = data['number']
      this.totalQuantity = data['totalQuantity']
      this.totalAmount = data['totalAmount']
      this.totalItems = data['totalItems']
      this.dataSource = new MatTableDataSource(this.tableData)
      this.generateUpdateBill = true
    })
  }
  back() {
    this.isUpdateButtonClicked = false
  }
  navFun(data: string) {
    if (data == 'BILL') {
      this.navCtrl.navigateForward('/bill')
    }
    else if (data == 'RATE') {
      this.navCtrl.navigateForward('/rate')
    }
    else if (data == 'SETTLEMENT') {
      this.navCtrl.navigateForward('/settlement')
    }
    else if (data == 'CUSTOMER') {
      this.navCtrl.navigateForward('/customer')
    }
    else if (data == 'SETTING') {
      this.navCtrl.navigateForward('/setting')
    }
    else if (data == 'LOGOUT') {
      this.nativeStorage.setItem('logStatus', 'Logout')
      console.log(this.nativeStorage.getItem('logStatus'))
      this.navCtrl.navigateForward('')
    }
    else if (data == 'U&U') {
      this.isBill = true
      this.inputDisable = true
    }
  }



  onInputChange(event: any): void {
    this.filterOptions();
  }

  filterOptions(): void {
    if (this.phoneNumber) {
      const filterValue = this.phoneNumber.toLowerCase();
      this.filteredOptions = this.options.filter(option => option.toLowerCase().includes(filterValue));
    } else {
      this.filteredOptions = [];
    }
  }



  onArrowDown(index: any) {
    console.log('dslkhgfsdkljlkfs;fk')
    console.log(index)
    if (index < this.filteredOptions.length - 1) {
      this.selectedIndex = index + 1; // Move selection down
    }
  }
  inlist(option: any) {
    console.log('called')
    if (option == '7302939977') {
      console.log('true called 7302939977')
      return true
    }
    return false
  }
  onEnterKey(option: string) {

    if (this.selectedIndex >= 0) {
      this.onOptionSelected(option); // Select the option
    }
  }


  async authorize(): Promise<void> {
    await this.googleDriveService.authorize();
    console.log('Authorization successful!');

  }

  async saveData(): Promise<void> {
    console.log('savedata called!');
    const data = {
      example: 'data',
      foo: 'bar'
    };

    await this.googleDriveService.saveDataToDrive(data);
    console.log('Data saved to Google Drive!');
  }


  onSelectFocus() {
    this.filteredOptions = [];
  }

  onSelectChange() {
    this.searchQuery = this.selectedOption || '';
    this.filteredOptions = [];
  }

  // navigateOptions(direction: string) {
  //   if (this.filteredOptions.length === 0) {
  //     return;
  //   }

  //   if (direction === 'down') {
  //     this.selectedIndex = Math.min(this.selectedIndex + 1, this.filteredOptions.length - 1);
  //   } else if (direction === 'up') {
  //     this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
  //   }
  // }

  // selectOption() {
  //   if (this.selectedIndex >= 0 && this.selectedIndex < this.filteredOptions.length) {
  //     this.onOptionSelected(this.filteredOptions[this.selectedIndex]);
  //   }
  // }

  onInputChanged() {

    this.filterOptions()
    this.selectedIndex = -1;
  }
  navigateOptions(direction: string) {
    console.log('navigateoption', direction)
    if (this.filteredOptions.length === 0) {
      return;
    }

    if (direction === 'down') {
      this.selectedIndex = Math.min(this.selectedIndex + 1, this.filteredOptions.length - 1);
    } else if (direction === 'up') {
      this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
    }
    console.log('selected index', this.selectedIndex)
    this.cdr.detectChanges();
  }

  selectOption() {
    if (this.selectedIndex >= 0 && this.selectedIndex < this.filteredOptions.length) {
      this.onOptionSelected('')
    }
  }

  onOptionSelected(option: string) {

    if (this.checkPhoneNumber(this.filteredOptions[this.selectedIndex])) {
      this.phoneNumber = this.filteredOptions[this.selectedIndex]
      this.name = this.customerData[this.phoneNumber]

      this.filteredOptions = [];
      this.selectedIndex = -1;
      this.inputDisable = true
      this.isBill = true
      this.input2?.setFocus()
    }

  }

  onOptionSelectedclick(option: any): void {
    // Handle the selected option
    if (this.checkPhoneNumber(option)) {
      this.phoneNumber = option
      this.name = this.customerData[option]
      this.filteredOptions = [];
      this.selectedIndex = -1;
      this.inputDisable = true
      this.input2?.setFocus()
      this.isBill = true
    }

  }
  EditButtonClicked() {
    this.isEditButtonClicked = !this.isEditButtonClicked
  }

}





//customer 




