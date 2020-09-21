import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicemoveinpaintingPage } from './servicemoveinpainting.page';

const routes: Routes = [
  {
    path: '',
    component: ServicemoveinpaintingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicemoveinpaintingPageRoutingModule {}
