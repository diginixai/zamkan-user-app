import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgetpwPageRoutingModule } from './forgetpw-routing.module';

import { ForgetpwPage } from './forgetpw.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgetpwPageRoutingModule
  ],
  declarations: [ForgetpwPage]
})
export class ForgetpwPageModule {}
