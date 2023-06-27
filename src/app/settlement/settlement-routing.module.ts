import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettlementPage } from './settlement.page';

const routes: Routes = [
  {
    path: '',
    component: SettlementPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettlementPageRoutingModule {}
