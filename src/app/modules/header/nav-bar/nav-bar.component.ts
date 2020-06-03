import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { SidebarService } from 'src/app/modules/shared/sidebar/sidebar.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {

  private subs = new SubSink();
  constructor(private sidebarService: SidebarService) { }
  isNavClosed = false;

  ngOnInit(): void {
    this.subs.sink =
      this.sidebarService.openSideBar.subscribe(opened => {
        this.isNavClosed = false;
      });
    this.subs.sink =
      this.sidebarService.closeSideBar.subscribe(opened => {
        this.isNavClosed = true;
      });
  }

  openSideNav() {
    this.sidebarService.open();
  }

  closeSideNav() {
    this.sidebarService.close();

  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
