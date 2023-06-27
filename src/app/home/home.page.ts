import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private navCtrl: NavController) {}

  goToBill() {
    // Handle the logic for navigating to the Bill page
  }

  goToRate() {
    // Handle the logic for navigating to the Rate page
  }

  goToSettlement() {
    // Handle the logic for navigating to the Settlement page
  }

  goToSettings() {
    // Handle the logic for navigating to the Settings page
  }

  logout() {
    // Handle the logic for logging out
  }
}
