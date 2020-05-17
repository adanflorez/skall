import { ParlorService } from "./../../../services/parlor/parlor.service";
import { Component, OnInit } from '@angular/core';
import { ParlorTop } from "src/app/models/parlor-top.interface";

@Component({
  selector: 'sk-ads-sidebar',
  templateUrl: './ads-sidebar.component.html',
  styleUrls: ['./ads-sidebar.component.scss']
})
export class AdsSidebarComponent implements OnInit {

  parlorTop: Array<ParlorTop>;

  constructor(private parlorService: ParlorService) { }

  ngOnInit() {
    this.parlorService.getParlorTop().subscribe(res => {
      console.log(res)
      this.parlorTop = res.data.parlor;
    });
  }

}
