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

  constructor(private navCtrl:NavController ,private nativeStorage:NativeStorage) { 
    this.nativeStorage.getItem('logStatus').then(data=>{
      console.log(data,'innnnnnnnnnnnnnn')
      if(data == 'Login')
      {
        this.navCtrl.navigateForward('/bill');
      }
    })
  }

  ngOnInit() {
  }
  showLoginForm: boolean = true;
  loginEmail: string = '';
  loginPassword: string= '';
  signupName: string= '';
  signupEmail: string= '';
  signupPassword: string= '';

  
  toggleForm() {
    this.showLoginForm = !this.showLoginForm;
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




    // Write user login data to JSON file

    
    
    
  }

//  async login() {
//     // Perform signup logic here
//     console.log(await Storage.keys())
//     const raw_data = await Storage.get({key:this.loginEmail})
    
//     if (raw_data.value){
//       let data= JSON.parse(raw_data.value)
//       console.log(data);
//       if (data.password == this.loginPassword){
//         console.log('true')
//         this.navCtrl.navigateForward('/pagebill')
//       }
//     }

   
//     console.log('kkkkkkkkkkkkkkkkkkkk');


//   }

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
}


