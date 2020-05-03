import { Component, OnInit } from '@angular/core';
import DocumentType from 'src/app/models/documentType.interface';


@Component({
  selector: 'sk-register',
  templateUrl: './register.component.html',
  styleUrls: ['../authentication.scss']
})
export class RegisterComponent implements OnInit {

  documentTypes: DocumentType[] = [
    { id: 'cc', name: 'Cedula de ciudadania' },
    { id: 'ti', name: 'Tarjeta de identidad' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
