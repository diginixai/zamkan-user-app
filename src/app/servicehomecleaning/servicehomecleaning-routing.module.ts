import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicehomecleaningPage } from './servicehomecleaning.page';

const routes: Routes = [
  {
    path: '',
    component: ServicehomecleaningPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicehomecleaningPageRoutingModule {}
