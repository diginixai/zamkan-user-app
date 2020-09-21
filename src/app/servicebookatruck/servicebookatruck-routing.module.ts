import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicebookatruckPage } from './servicebookatruck.page';

const routes: Routes = [
  {
    path: '',
    component: ServicebookatruckPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicebookatruckPageRoutingModule {}
