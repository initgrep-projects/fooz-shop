import { Component, OnInit } from '@angular/core';
import { fadeIn } from 'src/app/animations/fadeAnimation';
import { AuthMessages } from 'src/app/util/app.labels';



@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.scss'],
  animations: [
    fadeIn
  ]
})
export class AccountMenuComponent implements OnInit {
  labels = AuthMessages.authAnchorLabels;
 
  constructor() { }

  ngOnInit(): void {  
  }

}
