import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicepestcontrolPage } from './servicepestcontrol.page';

const routes: Routes = [
  {
    path: '',
    component: ServicepestcontrolPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicepestcontrolPageRoutingModule {}
