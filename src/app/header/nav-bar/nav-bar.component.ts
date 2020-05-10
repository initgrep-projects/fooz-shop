import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SidebarService } from 'src/app/modules/shared/sidebar/sidebar.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  
  constructor(private sidebarService:SidebarService) { }

  ngOnInit(): void {
  }

  openSideNav() {
    this.sidebarService.open();
  }

  closeSideNav() {
    this.sidebarService.close();
  }
}
