import { UserService } from "./../../../services/user/user.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LessonsService } from "./../../../services/lessons/lessons.service";
import { Component, OnInit } from '@angular/core';
import { Lesson } from "src/app/models/lesson.interface";
import { ListPublication } from "src/app/models/list-publication.interface";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'sk-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  postForm: FormGroup;
  lessons: Array<Lesson>;
  listPublication: Array<ListPublication>;
  postFormDisabled = false;

  logo: string;
  closeResult = '';

  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;

  formData: any;

  constructor(
    private lessonService: LessonsService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.initForm();
    this.getDetail();
    this.getAllPost();
  }

  getDetail() {
    this.userService.getDetail().subscribe((res: any) => {
      this.logo = res.data.urlImgUser;
      this.lessonService.getLesson(0, '', 10000, res.data.publicKey).subscribe(response => {
        this.lessons = response.data.lesson;
      });
    });
  }

  initForm(): void {
    this.postForm = this.fb.group({
      post: ['', [Validators.required]],
      lessons: [[], [Validators.required]],
    });
  }

  createPost() {
    let imgUrl = '';
    this.postFormDisabled = true;
    const code = this.postForm.controls['lessons'].value;
    const lessons = this.postForm.controls['post'].value;
    if (this.fileData) {
      this.userService.postUploadFile(this.formData).subscribe((res: any) => {
        imgUrl = res.data.imgUrl;
        this.userService.createPost(code, lessons, imgUrl).subscribe(response => {
          this.postForm.reset();
          this.getAllPost();
          this.postFormDisabled = false;
        }, err => {
          this.postFormDisabled = false;
          console.error(err);
        });
      });
    } else {
      this.userService.createPost(code, lessons).subscribe(response => {
        this.postForm.reset();
        this.getAllPost();
        this.postFormDisabled = false;
      }, err => {
        this.postFormDisabled = false;
        console.error(err);
      });
    }

  }

  getAllPost() {
    this.userService.getAllPost().subscribe(res => {
      console.log(res);
      this.listPublication = res.data.listPublication;
    }, err => {
      console.error(err);
    });
  }

  open(content) {
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

  fileProgress(fileInput: any) {
    this.fileData = fileInput.target.files[0] as File;
    this.preview();
  }

  preview() {
    // Show preview
    const mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    };
  }

  onSubmit() {
    this.formData = new FormData();
    this.formData.append('file', this.fileData);
    console.log(this.formData);
    this.modalService.dismissAll();
  }

}
