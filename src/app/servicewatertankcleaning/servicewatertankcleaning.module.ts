import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicewatertankcleaningPageRoutingModule } from './servicewatertankcleaning-routing.module';

import { ServicewatertankcleaningPage } from './servicewatertankcleaning.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicewatertankcleaningPageRoutingModule
  ],
  declarations: [ServicewatertankcleaningPage]
})
export class ServicewatertankcleaningPageModule {}
