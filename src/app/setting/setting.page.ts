import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
@Component({
  selector: 'app-setting',
  templateUrl: 'setting.page.html',
  styleUrls: ['setting.page.scss'],
})
export class SettingPage {
  constructor(private navCtrl: NavController,private nativeStorage:NativeStorage) {}

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
}
