import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [IndexComponent, NavbarComponent],
  imports: [
    CommonModule,
    IndexRoutingModule,
    MatButtonModule
  ]
})
export class IndexModule { }
