import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BillPageRoutingModule } from './bill-routing.module';
import { MatTableModule } from '@angular/material/table';
import { BillPage } from './bill.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatTableModule,
    BillPageRoutingModule
  ],
  declarations: [BillPage]
})
export class BillPageModule {}
