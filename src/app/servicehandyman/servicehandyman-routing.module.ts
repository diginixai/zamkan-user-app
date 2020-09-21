import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicehandymanPage } from './servicehandyman.page';

const routes: Routes = [
  {
    path: '',
    component: ServicehandymanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicehandymanPageRoutingModule {}
