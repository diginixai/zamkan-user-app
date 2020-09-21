import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceelectricianPage } from './serviceelectrician.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceelectricianPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceelectricianPageRoutingModule {}
