import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopOrderhistoryPage } from './shop-orderhistory.page';

const routes: Routes = [
  {
    path: '',
    component: ShopOrderhistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopOrderhistoryPageRoutingModule {}
