import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthModalService } from '../../auth-modal/auth-modal.service';


@Component({
  selector: 'app-auth-register',
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.scss']
})
export class AuthRegisterComponent implements OnInit {

  registerForm: FormGroup;
  @Output() loginSelected = new EventEmitter<boolean>();

  constructor(
    public authModalService: AuthModalService
  ) { }

  ngOnInit(): void {

    this.registerForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password':new FormControl(null, [Validators.required ])
    });
  }

  emitLoginSelected(){
    this.loginSelected.emit(true);
  }
}
