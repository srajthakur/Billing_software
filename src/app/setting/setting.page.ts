import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { File } from '@ionic-native/file/ngx';
import * as XLSX from 'xlsx';
type customer = Record<string, string>;
@Component({
  selector: 'app-setting',
  templateUrl: 'setting.page.html',
  styleUrls: ['setting.page.scss'],
})
export class SettingPage {
  shopName: string;
  contactNumber: string;
   importFile: any;
  constructor(private navCtrl: NavController,private nativeStorage:NativeStorage,private fileChooser: FileChooser, private file: File) {
    this.shopName = '';
    this.contactNumber = '';
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
  // importData() {
  //   this.fileChooser.open()
  //     .then(fileURI => {
  //       // Use the selected fileURI to resolve the local filesystem URL
  //       this.file.resolveLocalFilesystemUrl(fileURI)
  //         .then(fileEntry => {
  //           if (fileEntry.isFile) {
  //             const fileURL = fileEntry.toURL();
  //             this.file.readAsArrayBuffer(this.file.tempDirectory, fileURL.substr(fileURL.lastIndexOf('/') + 1))
  //               .then((arrayBuffer) => {
  //                 const data = new Uint8Array(arrayBuffer);
  //                 const workbook = XLSX.read(data, { type: 'array' });
  //                 const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  //                 const importedData: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  
  //                 // Extract number and name columns from imported data
  //                 const importedNumbers = importedData.map(row => row[0]);
  //                 const importedNames = importedData.map(row => row[1]);
  
  //                 // Get existing customer data from native storage
  //                 this.nativeStorage.getItem('customer')
  //                   .then(existingData => {
  //                     // Merge existing data with imported data
  //                     const mergedData = { ...existingData, ...this.createcustomer(importedNumbers, importedNames) };
  
  //                     // Save merged data in native storage
  //                     this.nativeStorage.setItem('customer', mergedData)
  //                       .then(() => {
  //                         console.log('Import successful! Data merged and saved in native storage:', mergedData);
  //                       })
  //                       .catch(err => {
  //                         console.error('Error saving data in native storage:', err);
  //                       });
  //                   })
  //                   .catch(error => {
  //                     console.error('Error retrieving existing customer data:', error);
  //                   });
  //               })
  //               .catch(err => {
  //                 console.error('Error reading file:', err);
  //               });
  //           } else {
  //             console.error('Invalid file entry:', fileEntry);
  //           }
  //         })
  //         .catch(err => {
  //           console.error('Error resolving file:', err);
  //         });
  //     })
  //     .catch(err => {
  //       console.error('Error selecting file:', err);
  //     });
  // }

  
  fileupload($event: any){
    this.importFile = $event.target.files[0];
    console.log(this.importFile)
  }


  importData() {
    console.log(this.importFile)
    const file = this.importFile; // Get the selected file from the input event
    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      const arrayBuffer = fileReader.result as ArrayBuffer;
      const data = new Uint8Array(arrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const importedData: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      if (importedData && importedData.length > 0) {
        // Extract number and name columns from imported data
        const importedNumbers = importedData.map(row => row[0]);
        const importedNames = importedData.map(row => row[1]);
      // Get existing customer data from native storage
      this.nativeStorage.getItem('customer')
      .then(existingData => {
        // Merge existing data with imported data
        const mergedData = { ...existingData, ...this.createcustomer(importedNumbers, importedNames) };

        // Save merged data in native storage
        this.nativeStorage.setItem('customer', mergedData)
          .then(() => {
            console.log('Import successful! Data merged and saved in native storage:', mergedData);
          })
          .catch(err => {
            console.error('Error saving data in native storage:', err);
          });
      })
      .catch(error => {
        console.error('Error retrieving existing customer data:', error);
      });
        

        console.log('Imported Numbers:', importedNumbers);
        console.log('Imported Names:', importedNames);
      } else {
        console.error('No data found in the imported file.');
      }
    };

    fileReader.readAsArrayBuffer(file);
  }
//   importData() {
//     const filePath = this.file.applicationDirectory + 'cutomer.xlsx'; // Update with the actual file path

//     const reader = new FileReader();

//     reader.onloadend = () => {
//       const data = new Uint8Array(reader.result as ArrayBuffer);
//       const workbook = XLSX.read(data, { type: 'array' });
//       const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//       const importedData: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

//       // Extract number and name columns from imported data
//       const importedNumbers = importedData.map(row => row[0]);
//       const importedNames = importedData.map(row => row[1]);

//       // Get existing customer data from native storage
//       this.nativeStorage.getItem('customer')
//         .then(existingData => {
//           // Merge existing data with imported data
//           const mergedData = { ...existingData, ...this.createcustomer(importedNumbers, importedNames) };

//           // Save merged data in native storage
//           this.nativeStorage.setItem('customer', mergedData)
//             .then(() => {
//               console.log('Import successful! Data merged and saved in native storage:', mergedData);
//             })
//             .catch(err => {
//               console.error('Error saving data in native storage:', err);
//             });
//         })
//         .catch(error => {
//           console.error('Error retrieving existing customer data:', error);
//         });
//     };

//     reader.onerror = (err) => {
//       console.error('Error reading file:', err);
//     };

//     // this.file.readAsArrayBuffer(filePath)
//     //   .then((arrayBuffer) => {
//     //     reader.readAsArrayBuffer(arrayBuffer);
//     //   })
//     //   .catch(err => {
//     //     console.error('Error reading file:', err);
//     //   });
//  }
   createcustomer(numbers: any[], names: any[]): any {
    const customer :customer = {};
  
    for (let i = 0; i < numbers.length; i++) {
      if (numbers[i] != undefined && names[i]!=undefined){
        customer[numbers[i]] = names[i];
      }
      }
     
  
    return customer;
  }
  exportData() {
    this.nativeStorage.getItem('customer')
      .then(customer => {
        console.log(customer)
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(Object.entries(customer).map(([number, name]) => ({ number, name })));
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Customers');
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
  

}

