import { AuthenticationService } from "src/app/services/authentication/authentication.service";
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sk-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

}
