import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { SidebarService } from 'src/app/modules/shared/sidebar/sidebar.service';
import { SubSink } from 'subsink';
import { AuthMessages } from 'src/app/util/app.labels';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
 

  ngOnInit(): void {
   
  }


}
