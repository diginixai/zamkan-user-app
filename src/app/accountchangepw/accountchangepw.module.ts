import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountchangepwPageRoutingModule } from './accountchangepw-routing.module';

import { AccountchangepwPage } from './accountchangepw.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountchangepwPageRoutingModule
  ],
  declarations: [AccountchangepwPage]
})
export class AccountchangepwPageModule {}
