import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { ObjectTransformerService } from 'src/app/services/object-transformer.service';
import { Store } from '@ngrx/store';
import { AppState } from '../main/store/app.reducer';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(
    private authService: AuthService
    ) { }

  ngOnInit(): void {

    this.authService.user$.subscribe();

    this.authService.userFromStore$.subscribe(user => {
      console.log('the user in the store is = ', user);
    });

  }

}
