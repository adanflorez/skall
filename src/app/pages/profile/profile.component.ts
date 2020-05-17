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

  parlor: Parlor;
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

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private parlorService: ParlorService,
    private lessonService: LessonsService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.initForm();
    this.getDetail();
    this.getParlor();
    this.getCategoriesLesson();
  }

  initStepper() {
    this.parlorForm = this.fb.group({
      name: [this.parlor.name, Validators.required],
      description: [this.parlor.parlorDescription, Validators.required],
      url: [this.parlor.notifyUrl],
      email: [this.parlor.email, [Validators.required, Validators.email]],
      phoneNumber: [this.parlor.phoneNumber, Validators.required],
    });

    this.userForm = this.fb.group({
      address: [this.userProfile.address, Validators.required],
      age: [this.userProfile.age, Validators.required],
      gender: [this.userProfile.gender, Validators.required],
      job: [this.userProfile.job, Validators.required]
    });

    this.userEducationForm = this.fb.group({
      institution: [
        this.userProfile.academicList.length ? this.userProfile.academicList[0].nameInstitucion : '', Validators.required
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
        this.userProfile.academicList.length ? this.userProfile.academicList[0].levelOfStudy : '',
        Validators.required
      ],
      profesion: [
        this.userProfile.academicList.length ? this.userProfile.academicList[0].specialty : '',
        Validators.required
      ],
      skill: ['', Validators.required],
      interest: [[], Validators.required]
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
    }, (err: HttpErrorResponse) => {
      console.error(err);
    });
  }

  getParlor() {
    this.parlorService.getParlor().subscribe(res => {
      console.log(res);
      this.parlor = res.data;
      this.publicKey = res.data.publicKey;
      this.getLessons(this.publicKey);
    }, err => {
      console.error(err);
    });
  }

  getLessons(key: string) {
    this.lessonService.getLesson(0, '', 10000, key).subscribe(res => {
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
    }, err => {
      console.error(err);
    });
    this.userService.update(this.userForm).subscribe(res => {
      console.log(res);
    }, err => {
      console.error(err);
    });
    this.userService.updateEducation(
      this.userEducationForm,
      this.dateInit,
      this.dateFinish
    ).subscribe(res => {
      console.log(res);
    }, err => {
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
