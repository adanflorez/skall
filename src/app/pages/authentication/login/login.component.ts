import { environment } from "src/environments/environment";
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Router } from '@angular/router';
import UserLogged from "src/app/models/userLogged.interface";

@Component({
  selector: 'sk-login',
  templateUrl: './login.component.html',
  styleUrls: ['../authentication.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  formDisabled = false;

  alertState = false;
  alertType: string;
  alertMessage: string;

  constructor(private fb: FormBuilder, private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.initForm();
    this.authService.logout();
  }

  initForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    this.formDisabled = true;
    this.authService.login(
      this.loginForm.controls.username.value,
      this.loginForm.controls.password.value)
      .subscribe((res: any) => {
        const token = res.Authorization;
        const sessionId = res.SessionId;

        localStorage.setItem(environment.keyToken, token);
        localStorage.setItem(environment.keySessionId, sessionId);

        this.formDisabled = false;
        this.router.navigate(['/feed']);
      }, err => {
        console.error(err);
        this.alertState = true;
        this.alertType = 'danger';
        this.alertMessage = 'Error en credenciales';
        this.formDisabled = false;
      });
  }

  getErrorMessage(field: FormControl) {
    if (field.hasError('required')) {
      return 'Campo requerido';
    }

    return field.hasError('email') ? 'Correo inválido' : '';
  }

  closeAlert() {
    this.alertState = false;
  }
}
