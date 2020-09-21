import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicemoveinpaintingPageRoutingModule } from './servicemoveinpainting-routing.module';

import { ServicemoveinpaintingPage } from './servicemoveinpainting.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicemoveinpaintingPageRoutingModule
  ],
  declarations: [ServicemoveinpaintingPage]
})
export class ServicemoveinpaintingPageModule {}
