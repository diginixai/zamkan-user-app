import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceappliancerepairPage } from './serviceappliancerepair.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceappliancerepairPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceappliancerepairPageRoutingModule {}
