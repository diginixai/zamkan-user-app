import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountprofileeditPage } from './accountprofileedit.page';

const routes: Routes = [
  {
    path: '',
    component: AccountprofileeditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountprofileeditPageRoutingModule {}
