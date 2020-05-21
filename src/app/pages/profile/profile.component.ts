import { ActivatedRoute } from "@angular/router";
import { LessonsService } from './../../services/lessons/lessons.service';
import { Parlor } from './../../models/parlor.interface';
import { ParlorService } from './../../services/parlor/parlor.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { OwlOptions } from 'ngx-owl-carousel-o';
import { UserProfile } from 'src/app/models/userProfile.interface';
import { Lesson } from "src/app/models/lesson.interface";

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Interest } from "src/app/models/interest.interface";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";

@Component({
  selector: 'sk-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  alertState = false;
  alertType: string;
  alertMessage: string;

  publicKey: string;

  userProfile: UserProfile;

  classForm: FormGroup;
  formDisabled = false;

  categoriesLesson: Array<any>;
  lessons: Array<Lesson>;

  closeResult = '';

  customOptions: OwlOptions = {
    autoplay: true,
    autoplaySpeed: 700,
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: true
  };

  parlorForm: FormGroup;
  userForm: FormGroup;
  userEducationForm: FormGroup;
  interests: Array<Interest>;
  dateInit: Date;
  dateFinish: Date;

  parlorUpdateState: string;
  userUpdateState: string;
  educationUpdateState: string;
  isEditable = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private parlorService: ParlorService,
    private lessonService: LessonsService,
    private modalService: NgbModal,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const user = this.route.snapshot.paramMap.get('user');
    console.log(user);
    if (typeof user !== 'undefined' && user !== null) {
      this.isEditable = false;
      console.log('otro perfil');
      this.getParlorByPublicKey(user);
    } else {
      this.isEditable = true;
      console.log('perfil propio');
      this.getDetail();
    }
    this.initForm();
    this.getCategoriesLesson();
  }

  initStepper() {
    this.parlorForm = this.fb.group({
      name: [this.userProfile.name, Validators.required],
      description: [this.userProfile.parlorDescription, Validators.required],
      url: [this.userProfile.notifyUrl],
      email: [this.userProfile.email, [Validators.required, Validators.email]],
      phoneNumber: [this.userProfile.phoneNumber, Validators.required],
    });

    this.userForm = this.fb.group({
      address: [this.userProfile.addressUser, Validators.required],
      age: [this.userProfile.ageUser, Validators.required],
      gender: [this.userProfile.genderUser, Validators.required],
      job: [this.userProfile.jobUser, Validators.required]
    });

    this.userEducationForm = this.fb.group({
      institution: [
        this.userProfile.academicList.length ? this.userProfile.academicList[0].institution : '', Validators.required
      ],
      dateInit: [
        {
          value: this.userProfile.academicList.length ? this.userProfile.academicList[0].initEducation : '',
          disabled: true
        },
        [Validators.required]
      ],
      dateFinish: [
        { value: this.userProfile.academicList.length ? this.userProfile.academicList[0].finishEducation : '', disabled: true },
        [Validators.required]
      ],
      levelOfStudy: [
        this.userProfile.academicList.length ? this.userProfile.academicList[0].levelOfStudy : '', Validators.required],
      profesion: [
        this.userProfile.academicList.length ? this.userProfile.academicList[0].specialty : '',
        Validators.required
      ],
      skill: [[], Validators.required],
      interest: [
        this.userProfile.interestList
      ]
    });
  }

  initForm(): void {
    this.classForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      categoriesLesson: [[], [Validators.required]],
      password: ['']
    });
  }

  getDetail() {
    this.userService.getDetail().subscribe(res => {
      console.log(res.data);
      this.userProfile = res.data;
      console.log(this.userProfile);
      this.publicKey = res.data.publicKey;
      this.getLessons(this.publicKey);
    }, (err: HttpErrorResponse) => {
      console.error(err);
    });
  }

  getParlorByPublicKey(publicKey: string) {
    this.parlorService.getParlorByPublicKey(publicKey).subscribe((res: any) => {
      this.userProfile = res.data;
      console.log(res);
    }, err => {
      console.error(err);
    });
  }

  getLessons(key: string) {
    this.lessonService.getLesson(0, '', 10000, key).subscribe(res => {
      console.log(res);
      this.lessons = res.data.lesson;
    }, err => {
      console.error(err);
    });
  }

  getErrorMessage(field: FormControl) {
    if (field.hasError('required')) {
      return 'Campo requerido';
    }

    return field.hasError('email') ? 'Correo inválido' : '';
  }

  getCategoriesLesson() {
    this.lessonService.getCategoriesLesson().subscribe((res: any) => {
      this.categoriesLesson = res.data.categoryLesson;
      console.log(this.categoriesLesson);
    });
  }

  getInterests() {
    this.userService.getInterest().subscribe(res => {
      this.interests = res.data.interest;
      console.log(res);
    }, err => {
      console.error(err);
    });
  }

  createLesson() {
    const form = this.classForm;
    this.lessonService.create(
      form.controls['categoriesLesson'].value,
      form.controls['description'].value,
      form.controls['title'].value,
      form.controls['password'].value
    ).subscribe(res => {
      console.log(res);
      this.getLessons(this.publicKey);
      this.alertType = 'success';
      this.alertMessage = 'Clase creada';
      this.alertState = true;
      this.classForm.reset();
    }, err => {
      this.alertType = 'danger';
      this.alertMessage = 'No se pudo crear la clase';
      this.alertState = true;
      console.error(err);
    });
  }

  closeAlert() {
    this.alertState = false;
  }

  open(content) {
    this.initStepper();
    this.getInterests();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  updateUserAndParlor() {
    this.parlorService.updateParlor(this.parlorForm).subscribe(res => {
      console.log(res);
      this.parlorUpdateState = 'Datos de clase actualizados correctamente';
    }, err => {
      console.error(err);
      this.parlorUpdateState = 'Error al actualizar datos de clase';
    });
    this.userService.update(this.userForm).subscribe(res => {
      console.log(res);
      this.userUpdateState = 'Datos de usuario actualizados correctamente';
    }, err => {
      this.userUpdateState = 'Error al actualizar datos de usuario';
      console.error(err);
    });
    this.userService.updateEducation(
      this.userEducationForm,
      this.dateInit,
      this.dateFinish
    ).subscribe(res => {
      this.educationUpdateState = 'Datos de educación actualizados correctamente';
      console.log(res);
    }, err => {
      this.educationUpdateState = 'Error al actualizar datos de educación';
      console.error(err);
    });
  }

  change(date: string, event: MatDatepickerInputEvent<Date>) {
    console.log(event.value);
    switch (date) {
      case 'dateInit':
        this.dateInit = event.value;
        break;
      case 'dateFinish':
        this.dateFinish = event.value;
        break;
    }
  }
}
