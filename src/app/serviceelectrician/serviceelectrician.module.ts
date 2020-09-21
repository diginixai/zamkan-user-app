import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceelectricianPageRoutingModule } from './serviceelectrician-routing.module';

import { ServiceelectricianPage } from './serviceelectrician.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiceelectricianPageRoutingModule
  ],
  declarations: [ServiceelectricianPage]
})
export class ServiceelectricianPageModule {}
