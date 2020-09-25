import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicecarpetcleaningPage } from './servicecarpetcleaning.page';

const routes: Routes = [
  {
    path: '',
    component: ServicecarpetcleaningPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicecarpetcleaningPageRoutingModule {}
