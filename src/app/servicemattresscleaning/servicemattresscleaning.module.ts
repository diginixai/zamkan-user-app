import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicemattresscleaningPageRoutingModule } from './servicemattresscleaning-routing.module';

import { ServicemattresscleaningPage } from './servicemattresscleaning.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicemattresscleaningPageRoutingModule
  ],
  declarations: [ServicemattresscleaningPage]
})
export class ServicemattresscleaningPageModule {}
