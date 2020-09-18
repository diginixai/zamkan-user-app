import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicedeepcleaningPage } from './servicedeepcleaning.page';

const routes: Routes = [
  {
    path: '',
    component: ServicedeepcleaningPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicedeepcleaningPageRoutingModule {}
