import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingreviewPageRoutingModule } from './bookingreview-routing.module';

import { BookingreviewPage } from './bookingreview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookingreviewPageRoutingModule
  ],
  declarations: [BookingreviewPage]
})
export class BookingreviewPageModule {}
