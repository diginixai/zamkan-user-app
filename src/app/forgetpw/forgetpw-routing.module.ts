import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgetpwPage } from './forgetpw.page';

const routes: Routes = [
  {
    path: '',
    component: ForgetpwPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgetpwPageRoutingModule {}
