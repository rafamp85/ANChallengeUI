import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-template-profile',
  templateUrl: './profile.template.html',
  styleUrls: ['./profile.template.scss']
})
export class ProfileTemplateComponent implements OnInit, OnChanges {

  id: any;
  name: any;
  email: any;
  englishLevel: any;
  techKnowledge: any;
  role: any;

  @Input() user: any = {};
  @Input() myProfile: boolean = false;
  titleEditBtn: string = 'EDIT USER';

  constructor(
    private router: Router
  ) { }

    ngOnChanges( changes: SimpleChanges ) {
      this.initData();
    }


  ngOnInit(): void {
    this.initData();
  }

  initData() {  
    this.id = this.user.id;
    this.name = this.user.name;
    this.email = this.user.email;
    this.englishLevel = this.user.englishLevel;
    this.techKnowledge = this.user.techKnowledge;
    this.role = this.user.role;

    if( this.myProfile ) {
      this.name = 'My Profile';
      this.titleEditBtn='EDIT PROFILE';
    }
  }

  editUser() {
    if( this.myProfile ) {
      this.router.navigate(['/home/edit-profile'], {queryParams: this.user});
      return;
    }

    this.router.navigate(['/home/register'], {queryParams: this.user});
  }

}
