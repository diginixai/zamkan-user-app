import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShopOrderhistoryPageRoutingModule } from './shop-orderhistory-routing.module';

import { ShopOrderhistoryPage } from './shop-orderhistory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShopOrderhistoryPageRoutingModule
  ],
  declarations: [ShopOrderhistoryPage]
})
export class ShopOrderhistoryPageModule {}
