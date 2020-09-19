import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountprofileeditPageRoutingModule } from './accountprofileedit-routing.module';

import { AccountprofileeditPage } from './accountprofileedit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountprofileeditPageRoutingModule
  ],
  declarations: [AccountprofileeditPage]
})
export class AccountprofileeditPageModule {}
