import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopOrderDetailPage } from './shop-order-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ShopOrderDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopOrderDetailPageRoutingModule {}
