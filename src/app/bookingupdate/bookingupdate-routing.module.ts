import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingupdatePage } from './bookingupdate.page';

const routes: Routes = [
  {
    path: '',
    component: BookingupdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingupdatePageRoutingModule {}
