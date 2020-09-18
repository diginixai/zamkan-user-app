import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicehomecleaningPageRoutingModule } from './servicehomecleaning-routing.module';

import { ServicehomecleaningPage } from './servicehomecleaning.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicehomecleaningPageRoutingModule
  ],
  declarations: [ServicehomecleaningPage]
})
export class ServicehomecleaningPageModule {}
