import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  @ViewChild('sidenav') sideNav: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }

  openSideNav() {
    this.sideNav.nativeElement.style.width = '60%';
  }

  closeSideNav() {
    this.sideNav.nativeElement.style.width = '0px';
  }
}
