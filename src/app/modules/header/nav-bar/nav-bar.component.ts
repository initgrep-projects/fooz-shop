import { Component, OnInit } from '@angular/core';
import { AuthMessages } from 'src/app/util/app.labels';
import { SidebarService } from '../../shared/sidebar/sidebar.service';
import { HeaderService } from '../header.service';
import { fadeIn} from 'ng-animate';
import { trigger, transition, useAnimation } from '@angular/animations';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  animations: [
    trigger('fadeIn', [transition(':enter', useAnimation(fadeIn, {
      // Set the duration to 5seconds and delay to 2seconds
      params: { timing: 1 }
    }))])
  ]
})
export class NavBarComponent implements OnInit {
  labels = AuthMessages.authAnchorLabels;
  fadeIn: any;
  constructor(public sideBarService: SidebarService,
    public hs: HeaderService
    ){}

  ngOnInit(): void {
   
  }


}
