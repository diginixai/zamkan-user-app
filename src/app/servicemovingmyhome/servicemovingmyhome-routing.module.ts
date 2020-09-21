import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicemovingmyhomePage } from './servicemovingmyhome.page';

const routes: Routes = [
  {
    path: '',
    component: ServicemovingmyhomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicemovingmyhomePageRoutingModule {}
