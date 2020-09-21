import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicemovinginternationallyPage } from './servicemovinginternationally.page';

const routes: Routes = [
  {
    path: '',
    component: ServicemovinginternationallyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicemovinginternationallyPageRoutingModule {}
