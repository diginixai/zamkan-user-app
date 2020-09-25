import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicecarpetcleaningPageRoutingModule } from './servicecarpetcleaning-routing.module';

import { ServicecarpetcleaningPage } from './servicecarpetcleaning.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicecarpetcleaningPageRoutingModule
  ],
  declarations: [ServicecarpetcleaningPage]
})
export class ServicecarpetcleaningPageModule {}
