import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WhatincludedPage } from './whatincluded.page';

const routes: Routes = [
  {
    path: '',
    component: WhatincludedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WhatincludedPageRoutingModule {}
