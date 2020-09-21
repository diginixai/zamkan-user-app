import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceaccleaningPageRoutingModule } from './serviceaccleaning-routing.module';

import { ServiceaccleaningPage } from './serviceaccleaning.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiceaccleaningPageRoutingModule
  ],
  declarations: [ServiceaccleaningPage]
})
export class ServiceaccleaningPageModule {}
