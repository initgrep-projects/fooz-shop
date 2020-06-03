import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthModalService } from '../../auth-modal/auth-modal.service';
import { AuthMessages } from 'src/app/helpers/constants';
import { SubSink } from 'subsink';


@Component({
  selector: 'app-auth-register',
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.scss']
})
export class AuthRegisterComponent implements OnInit {
  readonly authMessages: any = AuthMessages;
  @Output() loginSelected = new EventEmitter<boolean>();
  private subs = new SubSink();

  registerForm: FormGroup;
  showAlert = true;
  isValidForm = false;
  constructor(
    public authModalService: AuthModalService
  ) { }

  ngOnInit(): void {

    this.registerForm = new FormGroup({
      'name' : new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'phone' : new FormControl(null, [ Validators.required,
                                         Validators.minLength(10),
                                          Validators.maxLength(13), 
                                          Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$')]),
      'password':new FormControl(null, [Validators.required, Validators.minLength(8) ])
    });

    this.subs.sink = 
    this.registerForm.statusChanges.subscribe(status => {
      this.isValidForm = status !== 'INVALID';
    });

  }

  closeAlert(){
    this.showAlert =  false;
  }
  emitLoginSelected(){
    this.loginSelected.emit(true);
  }
}
