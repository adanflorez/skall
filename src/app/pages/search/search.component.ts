import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { Parlor } from 'src/app/models/parlor.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sk-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  parlors: Array<Parlor>;
  page = 1;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    const search = this.route.snapshot.paramMap.get('id') || '';
    this.userService.searchParlor(0, search, 5).subscribe(res => {
      console.log(res);
      this.parlors = res.data.parlor;
      console.log(this.parlors);
    }, err => {
      console.error(err);
    });
  }

}
