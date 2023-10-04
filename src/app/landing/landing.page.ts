import { Component, OnInit } from '@angular/core';
//import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  today = new Date();
  dateString = this.today.toJSON().slice(0, 10);
  removeDate :string='00000'
  backdata :number=7
 
  constructor(private navCtrl:NavController ,private nativeStorage:NativeStorage){    
    console.log('alhasdaskf;lhnkldsafj')
    
    setTimeout(()=>{
      this.nativeStorage.getItem('backup_days').then(data=>{
        console.log('innnnnnnnnnnnnnnnnnnnnnnnnnnnnn')
        console.log(typeof data)
        this.backdata = data
        this.getDate(this.backdata)
       console.log(this.removeDate,data)
      }).catch(data=>{
        this.nativeStorage.setItem("backup_days",7)
           this.nativeStorage.setItem("shopName",'')
           this.nativeStorage.setItem('contactNumber','0000000000')
           console.log('outttttttttttttttttt')
           
      })

      this.nativeStorage.getItem('logStatus').then(data=>{
        console.log('logining data' ,data)
        if(data == 'Login')
        {
          this.navCtrl.navigateForward('/bill');
        }
      })

    },5000)




    setTimeout(()=>    {   
      console.log('datetodelete',this.removeDate)
      this.nativeStorage.remove(this.removeDate) 

      this.nativeStorage.getItem('backupdate').then(data=>{
      console.log('backupdate======================',data)
      if (this.dateString != data){
        this.downloadBackupFile()
      }
          
    }).catch(data=>{
      console.log('yoooooooooooooooooooooooo')
      this.nativeStorage.setItem("backupdate",this.dateString)
    }
     
    )
    this.nativeStorage.getItem('barcode').then(data=>{

    }).catch(data=>{
      this.nativeStorage.setItem('barcode',1234560000200)
    })

     


  },10000)

  }

  ngOnInit() {
  }
  showLoginForm: boolean = true;
  loginEmail: string = '';
  loginPassword: string= '';
  signupName: string= '';
  signupEmail: string= '';
  signupPassword: string= '';
  folderId: string = '';
  accessToken: string = '';

  
  toggleForm() {
    
    this.showLoginForm = !this.showLoginForm;
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
      this.nativeStorage.setItem("backupdate",this.dateString)
  }
  
  signup() {
    // Perform login logic here
    console.log('Login form submitted');
    console.log('Email:', this.loginEmail);
    console.log('Password:', this.loginPassword);


    this.nativeStorage.setItem(this.signupName, {  
      username: this.signupName,
      password: this.signupPassword,
      email: this.signupEmail })
      .then(() =>
      this.navCtrl.navigateForward('/bill'))
      .catch(error => console.error('Error storing data:', error));
    
  }


  async login() {
    // Retrieve the stored data from native storage
    console.log( this.nativeStorage.keys())
    const k= this.nativeStorage.getItem(this.loginEmail)
    console.log(k)
    console.log(this.nativeStorage.getItem('logStatus'))
    
    this.nativeStorage.getItem(this.loginEmail)
      .then(data => {
        if (data.password === this.loginPassword) {
          console.log('Login successful.');
          this.nativeStorage.setItem('logStatus','Login')
          console.log(this.nativeStorage.getItem('logStatus'))
          this.navCtrl.navigateForward('/bill');
        } else {
          console.log('Invalid credentials.');
        }
      })
      .catch(error => console.error('Error retrieving data:', error));
  }
   getDate(n: number) {
    const today = new Date();
    console.log(today,'in getdate')
    const date = new Date(today.getTime() - n * 24 * 60 * 60 * 1000);
  
    const dateString = date.toISOString().slice(0, 10);
    
    this.removeDate = dateString;
  }
}

//comment
//fffffff


