import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-user-pill',
  templateUrl: './user-pill.component.html',
  styleUrls: ['./user-pill.component.scss']
})
export class UserPillComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

}
