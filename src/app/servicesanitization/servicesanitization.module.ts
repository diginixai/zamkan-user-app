import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicesanitizationPageRoutingModule } from './servicesanitization-routing.module';

import { ServicesanitizationPage } from './servicesanitization.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicesanitizationPageRoutingModule
  ],
  declarations: [ServicesanitizationPage]
})
export class ServicesanitizationPageModule {}
