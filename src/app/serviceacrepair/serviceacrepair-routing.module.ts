import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceacrepairPage } from './serviceacrepair.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceacrepairPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceacrepairPageRoutingModule {}
