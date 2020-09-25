import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShopProductDetailPageRoutingModule } from './shop-product-detail-routing.module';

import { ShopProductDetailPage } from './shop-product-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShopProductDetailPageRoutingModule
  ],
  declarations: [ShopProductDetailPage]
})
export class ShopProductDetailPageModule {}
