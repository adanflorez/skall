import { UserService } from "./../../../services/user/user.service";
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sk-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  userName: string;
  description: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getDetail();
  }

  getDetail() {
    this.userService.getDetail().subscribe((res: any) => {
      this.userName = res.data.firstName + ' ' + res.data.lastName;
      this.description = res.data.description;
    });
  }

}
