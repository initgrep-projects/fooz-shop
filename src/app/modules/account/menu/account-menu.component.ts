import { Component, OnInit } from '@angular/core';
import { staggerSlideInList } from 'src/app/animations/slideAnimations';
import { fadeIn } from 'src/app/animations/fadeAnimation';


@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.scss'],
  animations: [
    fadeIn
  ]
})
export class AccountMenuComponent implements OnInit {

 
  constructor() { }

  ngOnInit(): void {  
  }

}
