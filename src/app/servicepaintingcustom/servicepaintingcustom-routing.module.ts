import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicepaintingcustomPage } from './servicepaintingcustom.page';

const routes: Routes = [
  {
    path: '',
    component: ServicepaintingcustomPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicepaintingcustomPageRoutingModule {}
