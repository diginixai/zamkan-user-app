import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicemovinginternationallyPageRoutingModule } from './servicemovinginternationally-routing.module';

import { ServicemovinginternationallyPage } from './servicemovinginternationally.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicemovinginternationallyPageRoutingModule
  ],
  declarations: [ServicemovinginternationallyPage]
})
export class ServicemovinginternationallyPageModule {}
