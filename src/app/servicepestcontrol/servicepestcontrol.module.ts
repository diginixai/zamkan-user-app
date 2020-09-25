import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicepestcontrolPageRoutingModule } from './servicepestcontrol-routing.module';

import { ServicepestcontrolPage } from './servicepestcontrol.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicepestcontrolPageRoutingModule
  ],
  declarations: [ServicepestcontrolPage]
})
export class ServicepestcontrolPageModule {}
