import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceaccleaningPage } from './serviceaccleaning.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceaccleaningPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceaccleaningPageRoutingModule {}
