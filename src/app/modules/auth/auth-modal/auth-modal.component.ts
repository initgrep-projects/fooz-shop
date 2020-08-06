import { Component, OnInit } from '@angular/core';
import { AuthAccessComponent } from '../auth-access/auth-access.component';
import { AuthModalService } from './auth-modal.service';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss']
})
export class AuthModalComponent implements OnInit {

  constructor(private authModalService: AuthModalService) { }

  ngOnInit(): void {
    this.authModalService.openModal(AuthAccessComponent);
  }

}
