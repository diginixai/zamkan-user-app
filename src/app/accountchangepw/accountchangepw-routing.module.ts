import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountchangepwPage } from './accountchangepw.page';

const routes: Routes = [
  {
    path: '',
    component: AccountchangepwPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountchangepwPageRoutingModule {}
