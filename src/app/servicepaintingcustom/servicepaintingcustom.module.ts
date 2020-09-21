import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicepaintingcustomPageRoutingModule } from './servicepaintingcustom-routing.module';

import { ServicepaintingcustomPage } from './servicepaintingcustom.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicepaintingcustomPageRoutingModule
  ],
  declarations: [ServicepaintingcustomPage]
})
export class ServicepaintingcustomPageModule {}
