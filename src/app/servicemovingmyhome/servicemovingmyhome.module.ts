import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicemovingmyhomePageRoutingModule } from './servicemovingmyhome-routing.module';

import { ServicemovingmyhomePage } from './servicemovingmyhome.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicemovingmyhomePageRoutingModule
  ],
  declarations: [ServicemovingmyhomePage]
})
export class ServicemovingmyhomePageModule {}
