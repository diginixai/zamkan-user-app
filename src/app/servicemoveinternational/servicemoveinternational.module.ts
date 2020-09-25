import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicemoveinternationalPageRoutingModule } from './servicemoveinternational-routing.module';

import { ServicemoveinternationalPage } from './servicemoveinternational.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicemoveinternationalPageRoutingModule
  ],
  declarations: [ServicemoveinternationalPage]
})
export class ServicemoveinternationalPageModule {}
