import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicewatertankcleaningPage } from './servicewatertankcleaning.page';

const routes: Routes = [
  {
    path: '',
    component: ServicewatertankcleaningPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicewatertankcleaningPageRoutingModule {}
