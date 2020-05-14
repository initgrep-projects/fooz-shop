import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { FireStoreDbService } from 'src/app/services/firestore.db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'foozshop';

  subs: Subscription[] = [];

  constructor(private router: Router, private dbService: FireStoreDbService) { }

  ngOnInit(): void {
    this.scrollTopOnRouterChange();
  }


  scrollTopOnRouterChange() {
    this.subs[this.subs.length + 1] =
      this.router.events.subscribe((event) => {
        if (!(event instanceof NavigationEnd)) {
          return;
        }
        window.scrollTo(0, 0);
      });
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
