import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingupdatePageRoutingModule } from './bookingupdate-routing.module';

import { BookingupdatePage } from './bookingupdate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookingupdatePageRoutingModule
  ],
  declarations: [BookingupdatePage]
})
export class BookingupdatePageModule {}
