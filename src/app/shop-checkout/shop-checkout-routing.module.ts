import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopCheckoutPage } from './shop-checkout.page';

const routes: Routes = [
  {
    path: '',
    component: ShopCheckoutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopCheckoutPageRoutingModule {}
