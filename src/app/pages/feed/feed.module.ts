import { SharedModule } from "./../../shared/shared.module";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedRoutingModule } from './feed-routing.module';
import { FeedComponent } from './feed.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContentComponent } from './content/content.component';
import { AdsSidebarComponent } from './ads-sidebar/ads-sidebar.component';

@NgModule({
  declarations: [FeedComponent, SidebarComponent, ContentComponent, AdsSidebarComponent],
  imports: [
    CommonModule,
    FeedRoutingModule,
    SharedModule
  ]
})
export class FeedModule { }
