import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { SharedModule } from "./../../shared/shared.module";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedRoutingModule } from './feed-routing.module';
import { FeedComponent } from './feed.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContentComponent } from './content/content.component';
import { AdsSidebarComponent } from './ads-sidebar/ads-sidebar.component';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [FeedComponent, SidebarComponent, ContentComponent, AdsSidebarComponent],
  imports: [
    CommonModule,
    FeedRoutingModule,
    SharedModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule
  ]
})
export class FeedModule { }
