import { UserProfile } from "src/app/models/userProfile.interface";
import { UserService } from "./../../../services/user/user.service";
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sk-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  userProfile: UserProfile;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getDetail();
  }

  getDetail() {
    this.userService.getDetail().subscribe((res: any) => {
      console.log(res);
      this.userProfile = res.data;
      localStorage.setItem('logo', this.userProfile.urlImgUser);
    });
  }

}
