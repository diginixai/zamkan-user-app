import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicesofacleaningPage } from './servicesofacleaning.page';

const routes: Routes = [
  {
    path: '',
    component: ServicesofacleaningPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesofacleaningPageRoutingModule {}
