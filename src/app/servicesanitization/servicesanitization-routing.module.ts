import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicesanitizationPage } from './servicesanitization.page';

const routes: Routes = [
  {
    path: '',
    component: ServicesanitizationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesanitizationPageRoutingModule {}
