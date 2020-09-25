import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicesofacleaningPageRoutingModule } from './servicesofacleaning-routing.module';

import { ServicesofacleaningPage } from './servicesofacleaning.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicesofacleaningPageRoutingModule
  ],
  declarations: [ServicesofacleaningPage]
})
export class ServicesofacleaningPageModule {}
