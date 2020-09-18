import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WhatincludedPageRoutingModule } from './whatincluded-routing.module';

import { WhatincludedPage } from './whatincluded.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WhatincludedPageRoutingModule
  ],
  declarations: [WhatincludedPage]
})
export class WhatincludedPageModule {}
