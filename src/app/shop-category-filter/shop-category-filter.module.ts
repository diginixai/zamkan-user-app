import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShopCategoryFilterPageRoutingModule } from './shop-category-filter-routing.module';

import { ShopCategoryFilterPage } from './shop-category-filter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShopCategoryFilterPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ShopCategoryFilterPage]
})
export class ShopCategoryFilterPageModule {}
