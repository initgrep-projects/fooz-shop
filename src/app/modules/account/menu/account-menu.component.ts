import { Component, OnInit } from '@angular/core';
import { staggerSlideInList } from 'src/app/animations/slideAnimations';


@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.scss'],
  animations: [
    staggerSlideInList
  ]
})
export class AccountMenuComponent implements OnInit {

 
  constructor() { }

  ngOnInit(): void {  
  }

}
