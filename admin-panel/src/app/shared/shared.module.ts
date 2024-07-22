import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';

@NgModule({
  declarations: [
    AdminNavbarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AdminNavbarComponent
  ]
})
export class SharedModule { }