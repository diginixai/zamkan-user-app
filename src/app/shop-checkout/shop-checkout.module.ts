import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShopCheckoutPageRoutingModule } from './shop-checkout-routing.module';

import { ShopCheckoutPage } from './shop-checkout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShopCheckoutPageRoutingModule
  ],
  declarations: [ShopCheckoutPage]
})
export class ShopCheckoutPageModule {}
