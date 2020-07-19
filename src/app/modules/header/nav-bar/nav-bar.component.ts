import { Component, OnInit } from '@angular/core';
import { AuthMessages } from 'src/app/util/app.labels';
import { SidebarService } from '../../shared/sidebar/sidebar.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  labels = AuthMessages.authAnchorLabels;

  constructor(public sideBarService: SidebarService){}

  ngOnInit(): void {
   
  }


}
