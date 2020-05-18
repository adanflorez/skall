import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/services/authentication/authentication.service";
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sk-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  email: string;
  searchForm: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      email: ['']
    });
  }

  logout() {
    this.authService.logout();
  }

  setLogo(): string {
    return localStorage.getItem('logo');
  }

  goToSearch() {
    console.log(this.searchForm.controls['email'].value);
    this.router.navigate([`/search/${this.searchForm.controls['email'].value}`]);
  }

}
