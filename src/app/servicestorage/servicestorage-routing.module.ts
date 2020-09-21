import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicestoragePage } from './servicestorage.page';

const routes: Routes = [
  {
    path: '',
    component: ServicestoragePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicestoragePageRoutingModule {}
