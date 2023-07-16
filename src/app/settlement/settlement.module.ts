import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SettlementPage } from './settlement.page';

import { SettlementPageRoutingModule } from './settlement-routing.module';
import { MatTableModule } from '@angular/material/table';
import { WebBluetoothModule } from '@manekinekko/angular-web-bluetooth';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatTableModule,
    SettlementPageRoutingModule,
    WebBluetoothModule.forRoot({
      enableTracing: false  
    })
  ],
  declarations: [SettlementPage]
})
export class SettlementPageModule {}
