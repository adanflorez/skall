import { GlobalService } from "./../../../services/global.service";
import { AuthenticationService } from './../../../services/authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import DocumentType from 'src/app/models/documentType.interface';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'sk-register',
  templateUrl: './register.component.html',
  styleUrls: ['../authentication.scss']
})
export class RegisterComponent implements OnInit {

  validationForm: FormGroup;

  documentTypes: DocumentType[] = null;

  constructor(private fb: FormBuilder, private authService: AuthenticationService, private globalService: GlobalService) { }

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
    this.authService.registerUser(this.validationForm.value).subscribe(res => {
      console.log(res);
    }, err => {
      console.error(err);
    });
  }

  getDocumentTypes() {
    this.globalService.getDocumentTypes().subscribe(res => {
      this.documentTypes = res.data.document;
    }, err => {
      console.error(err);
    });
  }
}
