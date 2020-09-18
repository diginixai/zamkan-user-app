import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicedeepcleaningPageRoutingModule } from './servicedeepcleaning-routing.module';

import { ServicedeepcleaningPage } from './servicedeepcleaning.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicedeepcleaningPageRoutingModule
  ],
  declarations: [ServicedeepcleaningPage]
})
export class ServicedeepcleaningPageModule {}
