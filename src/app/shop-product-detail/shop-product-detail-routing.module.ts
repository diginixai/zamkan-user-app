import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopProductDetailPage } from './shop-product-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ShopProductDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopProductDetailPageRoutingModule {}
