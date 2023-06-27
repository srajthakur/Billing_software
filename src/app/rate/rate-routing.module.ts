import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RatePage } from './rate.page';

const routes: Routes = [
  {
    path: '',
    component: RatePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RatePageRoutingModule {}
