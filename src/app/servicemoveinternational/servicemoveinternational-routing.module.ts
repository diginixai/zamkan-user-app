import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicemoveinternationalPage } from './servicemoveinternational.page';

const routes: Routes = [
  {
    path: '',
    component: ServicemoveinternationalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicemoveinternationalPageRoutingModule {}
