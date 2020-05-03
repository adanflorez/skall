import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { MainComponent } from './components/main/main.component';
import { FunctionalitiesComponent } from './components/functionalities/functionalities.component';
import { ClassroomComponent } from './components/classroom/classroom.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContributeComponent } from './components/contribute/contribute.component';
import { OpinionsComponent } from './components/opinions/opinions.component';


@NgModule({
  declarations: [
    IndexComponent,
    NavbarComponent,
    MainComponent,
    FunctionalitiesComponent,
    ClassroomComponent,
    ProjectsComponent,
    ContributeComponent,
    OpinionsComponent
  ],
  imports: [
    CommonModule,
    IndexRoutingModule,
    MatButtonModule,
    MatInputModule,
    SharedModule
  ]
})
export class IndexModule { }
