import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicestoragePageRoutingModule } from './servicestorage-routing.module';

import { ServicestoragePage } from './servicestorage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicestoragePageRoutingModule
  ],
  declarations: [ServicestoragePage]
})
export class ServicestoragePageModule {}
