import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HeaderService } from '../header.service';
import { transition, trigger, useAnimation } from '@angular/animations';
import { fadeIn } from 'ng-animate';

@Component({
  selector: 'app-sec-nav-bar',
  templateUrl: './sec-nav-bar.component.html',
  styleUrls: ['./sec-nav-bar.component.scss'],
  animations: [
    trigger('fadeIn', [transition(':enter', useAnimation(fadeIn, {
      // Set the duration to 5seconds and delay to 2seconds
      params: { timing: 1 }
    }))])
  ]
})
export class SecNavBarComponent implements OnInit {
  state:any
  constructor(
    public location: Location,
    public hs: HeaderService) { }

  ngOnInit(): void {
  }

}
