import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BillPageRoutingModule } from './bill-routing.module';
import { MatTableModule } from '@angular/material/table';
import { BillPage } from './bill.page';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatTableModule,
    BillPageRoutingModule,
    MatIconModule,
    MatAutocompleteModule,
    MatFormFieldModule
  ],
  declarations: [BillPage]
})
export class BillPageModule {}
