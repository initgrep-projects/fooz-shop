import { Component, OnInit } from '@angular/core';
import { AuthMessages } from 'src/app/util/app.labels';
import { SubSink } from 'subsink';
import { SidebarService } from '../../shared/sidebar/sidebar.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  labels = AuthMessages.authAnchorLabels;
  private subs = new SubSink();
  constructor(private sidebarService: SidebarService) { }
  isNavClosed = false;

  ngOnInit(): void {
    
   
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
