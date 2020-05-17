import { UserService } from "./../../services/user/user.service";
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sk-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.searchParlor(0, '', 3).subscribe(res => {
      console.log(res);
    }, err => {
      console.error(err);
    });
  }

}
