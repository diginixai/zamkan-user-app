import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShopOrderDetailPageRoutingModule } from './shop-order-detail-routing.module';

import { ShopOrderDetailPage } from './shop-order-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShopOrderDetailPageRoutingModule
  ],
  declarations: [ShopOrderDetailPage]
})
export class ShopOrderDetailPageModule {}
