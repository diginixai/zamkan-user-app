import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountaddressmanagePageRoutingModule } from './accountaddressmanage-routing.module';

import { AccountaddressmanagePage } from './accountaddressmanage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountaddressmanagePageRoutingModule
  ],
  declarations: [AccountaddressmanagePage]
})
export class AccountaddressmanagePageModule {}
