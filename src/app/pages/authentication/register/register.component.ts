import { GlobalService } from "./../../../services/global.service";
import { AuthenticationService } from './../../../services/authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import DocumentType from 'src/app/models/documentType.interface';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";


@Component({
  selector: 'sk-register',
  templateUrl: './register.component.html',
  styleUrls: ['../authentication.scss']
})
export class RegisterComponent implements OnInit {

  validationForm: FormGroup;

  documentTypes: DocumentType[] = null;

  formDisabled = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private globalService: GlobalService,
    private router: Router
  ) { }

  alertState = false;
  alertType: string;
  alertMessage: string;

  ngOnInit() {
    this.validationForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      secondLastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      documentType: ['', [Validators.required]],
      documentNumber: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.getDocumentTypes();
  }

  getErrorMessage(field: FormControl) {
    if (field.hasError('required')) {
      return 'Campo requerido';
    }

    return field.hasError('email') ? 'Correo inválido' : '';
  }

  registerUser() {
    this.formDisabled = true;
    this.authService.registerUser(this.validationForm.value).subscribe(res => {
      this.formDisabled = false;
      this.router.navigate(['/login']);
    }, (err: HttpErrorResponse) => {
      console.error(err);
      this.alertState = true;
      this.alertType = 'danger';
      this.alertMessage = err.error.message;
      this.formDisabled = false;
    });
  }

  getDocumentTypes() {
    this.globalService.getDocumentTypes().subscribe(res => {
      this.documentTypes = res.data.document;
    }, err => {
      console.error(err);
    });
  }

  closeAlert() {
    this.alertState = false;
  }
}
