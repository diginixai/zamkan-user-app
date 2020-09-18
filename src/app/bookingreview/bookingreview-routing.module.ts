import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingreviewPage } from './bookingreview.page';

const routes: Routes = [
  {
    path: '',
    component: BookingreviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingreviewPageRoutingModule {}
