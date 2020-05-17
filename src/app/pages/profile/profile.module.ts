import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';


import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgbNavModule, NgbAlertModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { CarouselModule } from 'ngx-owl-carousel-o';


@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    NgbNavModule,
    NgbAlertModule,
    NgbModalModule,
    CarouselModule
  ]
})
export class ProfileModule { }
