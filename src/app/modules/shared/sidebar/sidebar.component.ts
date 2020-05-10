import { Component, OnInit, ViewChild, ElementRef, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { SidebarService } from './sidebar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('sidenav') sideNav: ElementRef;
  @ViewChild('sidenavMask') sideNavMask: ElementRef;

  private subs: Subscription[] = [];

  constructor(private sidebarService: SidebarService) { }

  @Input('from') from: string;
  @Input('bgColor') bgColor: string;


  ngAfterViewInit(): void {
    this.initialize();
  }

  ngOnInit(): void {
    this.enableOpen();
    this.enableClose();
  }

 

  open() {
    this.sidebarService.open();
  }

  close() {
    this.sidebarService.close();
  }

  private enableOpen() {
    this.subs[this.subs.length + 1] =
      this.sidebarService.openSideBar.subscribe(status => {
        this.sideNavMask.nativeElement.style.width= '100%';
        this.sideNav.nativeElement.style.width = '25%';
      });
  }

  private enableClose() {
    this.subs[this.subs.length + 1] =
      this.sidebarService.closeSideBar.subscribe(status => {
        this.sideNavMask.nativeElement.style.width= '0px';
        this.sideNav.nativeElement.style.width = '0px';
      });
  }
  private initialize() {
    this.sideNav.nativeElement.style.backgroundColor = !!this.bgColor ? this.bgColor : '#f1f1f1';
    if (this.from === 'right') {
      this.sideNav.nativeElement.style.right = '0';
    } else {
      this.sideNav.nativeElement.style.left = '0';
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
