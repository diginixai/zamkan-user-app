import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceappliancerepairPageRoutingModule } from './serviceappliancerepair-routing.module';

import { ServiceappliancerepairPage } from './serviceappliancerepair.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiceappliancerepairPageRoutingModule
  ],
  declarations: [ServiceappliancerepairPage]
})
export class ServiceappliancerepairPageModule {}
