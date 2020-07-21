import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sec-nav-bar',
  templateUrl: './sec-nav-bar.component.html',
  styleUrls: ['./sec-nav-bar.component.scss']
})
export class SecNavBarComponent implements OnInit {

  constructor(public location: Location) { }

  ngOnInit(): void {
  }

}
