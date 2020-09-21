import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceplumberPage } from './serviceplumber.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceplumberPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceplumberPageRoutingModule {}
