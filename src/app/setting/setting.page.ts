import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { File } from '@ionic-native/file/ngx';
import * as XLSX from 'xlsx';

interface customer {
  [key: string]: string;
}
@Component({
  selector: 'app-setting',
  templateUrl: 'setting.page.html',
  styleUrls: ['setting.page.scss'],
})
export class SettingPage {
  shopName: string;
  contactNumber: string;
  backupDays:number;
   importFile: any;
  constructor(private navCtrl: NavController,private nativeStorage:NativeStorage,private fileChooser: FileChooser, private file: File) {
    this.shopName = '';
    this.contactNumber = '';
    this.backupDays=0
          this.nativeStorage.getItem("backup_days").then(data=>{
              this.backupDays=data
          })
         this.nativeStorage.getItem("shopName").then(data=>{
              this.shopName=data            
          })
         this.nativeStorage.getItem('contactNumber').then(data=>{
            this.contactNumber=data
         })
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
    else if (data == 'CUSTOMER'){
      this.navCtrl.navigateForward('/customer')
    }
    else if (data == 'LOGOUT'){
      console.log(this.nativeStorage.getItem('logStatus'))
      this.nativeStorage.setItem('logStatus','Logout')
      this.navCtrl.navigateForward('/landing')
    }
  }
 

  
  fileupload($event: any){
    this.importFile = $event.target.files[0];
    console.log(this.importFile)
  }


  async importData() {
    console.log(this.importFile);
    const file = this.importFile; // Get the selected file from the input event
    const fileReader = new FileReader();
  
    fileReader.onload = async (e) => { // Mark the callback function as async
      const arrayBuffer = fileReader.result as ArrayBuffer;
      const data = new Uint8Array(arrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const importedData: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  
      if (importedData && importedData.length > 0) {
        const importedNames = importedData.map(row => row[0]);
        const importedNumbers = importedData.map(row => row[1]);
  
        try {
          const existingData = await this.nativeStorage.getItem('customer');
  
          // Create customer data
          const mergedData = await this.createcustomer(importedNumbers, importedNames);
  
          // Merge existing data with imported data
          Object.assign(existingData, mergedData);
  
          // Save merged data in native storage
          await this.nativeStorage.setItem('customer', existingData);
  
          console.log('Import successful! Data merged and saved in native storage:', existingData);
        } catch (error) {
          console.error('Error handling data:', error);
        }
  
        console.log('Imported Numbers:', importedNumbers);
        console.log('Imported Names:', importedNames);
      } else {
        console.error('No data found in the imported file.');
      }
    };
  
    fileReader.readAsArrayBuffer(file);
  }
  

 async createcustomer(numbers: any[], names: any[]): Promise<any> {
  const customer: customer = {};
  console.log('in creating customer ');
  console.log(numbers);
  console.log('===================================================');
  
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i]!=undefined){
      numbers[i] = numbers[i].toString()
    }
   
    if (numbers[i] !== undefined && names[i] !== undefined && numbers[i].length > 9) {
      customer[numbers[i]] = names[i];
      console.log(numbers[i], ' : ', names[i]);
    }
    else if (numbers[i] !== undefined){
      console.log(i,numbers[i],':',names[i],numbers[i].length,typeof numbers[i]);
    }
     
  }

  console.log('outside loop');
  return customer;
}
  exportData() {
    this.nativeStorage.getItem('customer')
      .then(customer => {
        console.log(customer)
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(Object.entries(customer).map(([number, name]) => ({ number, name })));
        XLSX.utils.book_append_sheet(workbook, worksheet, 'customer');
        const excelBuffer = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });

        const fileName = 'customer_data.xlsx';
        const fileDirectory = this.file.externalRootDirectory; // Modify the directory as per your requirement

        this.file.writeFile(fileDirectory, fileName, excelBuffer, { replace: true })
          .then(() => {
            console.log('Export successful! File saved at:', fileDirectory + fileName);
          })
          .catch(err => {
            console.error('Error exporting data:', err);
          });
      })
      .catch(error => {
        console.error('Error retrieving customer data:', error);
      });
  }


  downloadBackupFile() {
    this.nativeStorage.keys()
      .then((keys: string[]) => {
        const dataToBackup: { [key: string]: any } = {};

        // Fetch all data from NativeStorage
        const fetchPromises = keys.map((key: string) => {
          return this.nativeStorage.getItem(key)
            .then((data) => {
              dataToBackup[key] = data;
            });
        });

        // Wait for all data to be fetched before proceeding to backup
        Promise.all(fetchPromises)
          .then(() => {
            try {
              // Convert the data to JSON format
              const jsonData = JSON.stringify(dataToBackup);

              // Create a Blob with the JSON data
              const blob = new Blob([jsonData], { type: 'application/json' });

              // Create a download link for the Blob
              const downloadLink = document.createElement('a');
              downloadLink.href = URL.createObjectURL(blob);
              downloadLink.download = 'backdata.json'; // Set the desired file name

              // Append the download link to the DOM and trigger the download
              document.body.appendChild(downloadLink);
              downloadLink.click();

              // Clean up after the download
              URL.revokeObjectURL(downloadLink.href);
              document.body.removeChild(downloadLink);

              console.log('Backup file downloaded successfully.');
            } catch (error) {
              console.error('Error converting data to JSON:', error);
            }
          })
          .catch((error) => {
            console.error('Error fetching data from NativeStorage:', error);
          });
      })
      .catch((error) => {
        console.error('Error retrieving keys from NativeStorage:', error);
      });
  }
  backupToSystem() {
    this.nativeStorage.clear()
 
  
    const file = this.importFile

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const jsonData: { [key: string]: any } = JSON.parse(reader.result as string);
          console.log('JSON Data:', jsonData);

          // Save the data to NativeStorage
          const savePromises = Object.entries(jsonData).map(([key, data]) => {
            return this.nativeStorage.setItem(key, data)
              .then(() => {
                console.log(`Data for key "${key}" saved to NativeStorage successfully.`);
              })
              .catch((error) => {
                console.error(`Error saving data for key "${key}":`, error);
              });
          });

          // Wait for all data to be saved before proceeding
          Promise.all(savePromises)
            .then(() => {
              console.log('All data saved to NativeStorage.');
            })
            .catch((error) => {
              console.error('Error saving data to NativeStorage:', error);
            });
        } catch (error) {
          console.error('Error parsing JSON data:', error);
        }
      };
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
      };

      reader.readAsText(file);
    }
  }
  saveData(){
         this.nativeStorage.setItem("backup_days",this.backupDays)
         this.nativeStorage.setItem("shopName",this.shopName)
         this.nativeStorage.setItem('contactNumber',this.contactNumber)

  }

  
  
  


 customerDataInExcel() {
  // // Sample data as a JavaScript dictionary
  // const data = [
  //   { Name: 'Alice', Age: 30 },
  //   { Name: 'Bob', Age: 25 },
  //   { Name: 'Charlie', Age: 35 },
  // ];

  // // Create a new workbook
  // const workbook = XLSX.utils.book_new();
  // const worksheet = XLSX.utils.json_to_sheet(data);

  // // Add the worksheet to the workbook
  // XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  // // Convert the workbook to a blob
  // const blob = XLSX.write(workbook, { bookType: 'xlsx', type: 'xlsx' });

  // // Define the file name and location
  // const fileName = 'data.xlsx';
  // const filePath = cordova.file.externalDataDirectory + fileName;

  // // Write the blob to a file using Cordova File plugin
  // window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function (dirEntry) {
  //   dirEntry.getFile(fileName, { create: true }, function (fileEntry) {
  //     fileEntry.createWriter(function (fileWriter) {
  //       fileWriter.write(blob);
  //       console.log('Excel file saved:', filePath);
  //     }, handleError);
  //   }, handleError);
  // }, handleError);

  // function handleError(error) {
  //   console.error('File operation error:', error);
  // }
}

}

