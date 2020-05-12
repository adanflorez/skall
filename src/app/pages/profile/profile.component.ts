import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'sk-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  classForm: FormGroup;
  formDisabled = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.classForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      documentType: ['', [Validators.required]],
      password: ['']
    });
  }

  getErrorMessage(field: FormControl) {
    if (field.hasError('required')) {
      return 'Campo requerido';
    }

    return field.hasError('email') ? 'Correo inválido' : '';
  }

}
