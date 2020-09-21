import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceplumberPageRoutingModule } from './serviceplumber-routing.module';

import { ServiceplumberPage } from './serviceplumber.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiceplumberPageRoutingModule
  ],
  declarations: [ServiceplumberPage]
})
export class ServiceplumberPageModule {}
