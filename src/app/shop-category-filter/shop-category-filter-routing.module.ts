import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopCategoryFilterPage } from './shop-category-filter.page';

const routes: Routes = [
  {
    path: '',
    component: ShopCategoryFilterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopCategoryFilterPageRoutingModule {}
