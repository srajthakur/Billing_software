import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RatePage } from './rate.page';

import { RatePageRoutingModule } from './rate-routing.module';

import { MatTableModule } from '@angular/material/table';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RatePageRoutingModule,
    MatTableModule
  ],
  declarations: [RatePage]
})
export class RatePageModule {}
