import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { FireStoreDbService } from 'src/app/services/firestore.db.service';
import { AuthService } from '../auth/auth.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'foozshop';

  subs = new SubSink();

  constructor(
    private router: Router, 
    private dbService: FireStoreDbService,
    private authservice: AuthService
    ) { }

  ngOnInit(): void {
    this.scrollTopOnRouterChange();
    this.listenToAuthUserChanges();
  }


  scrollTopOnRouterChange() {
    this.subs.sink = 
      this.router.events.subscribe((event) => {
        if (!(event instanceof NavigationEnd)) {
          return;
        }
        window.scrollTo(0, 0);
      });
  }

  listenToAuthUserChanges(){
    this.subs.sink = this.authservice.user$.subscribe();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
