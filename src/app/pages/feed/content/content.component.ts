import { UserService } from "./../../../services/user/user.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LessonsService } from "./../../../services/lessons/lessons.service";
import { Component, OnInit } from '@angular/core';
import { Lesson } from "src/app/models/lesson.interface";
import { ListPublication } from "src/app/models/list-publication.interface";

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

  constructor(
    private lessonService: LessonsService,
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.initForm();
    const key = localStorage.getItem('publicKey');
    this.lessonService.getLesson(0, '', 10000, key).subscribe(res => {
      console.log(res);
      this.lessons = res.data.lesson;
    });

    this.getAllPost();
  }

  initForm(): void {
    this.postForm = this.fb.group({
      post: ['', [Validators.required]],
      lessons: [[], [Validators.required]],
    });
  }

  createPost() {
    this.postFormDisabled = true;
    const code = this.postForm.controls['lessons'].value;
    const lessons = this.postForm.controls['post'].value;
    this.userService.createPost(code, lessons).subscribe(res => {
      this.postForm.reset();
      this.getAllPost();
      this.postFormDisabled = false;
    }, err => {
      this.postFormDisabled = false;
      console.error(err);
    });
  }

  getAllPost() {
    this.userService.getAllPost().subscribe(res => {
      console.log(res);
      this.listPublication = res.data.listPublication;
    }, err => {
      console.error(err);
    });
  }

}
