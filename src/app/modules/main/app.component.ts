import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  title = 'foozshop';


  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.scrollTopOnRouterChange();
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

 

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
