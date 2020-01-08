import { Component, OnInit } from '@angular/core';

import {faInstagram} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  faInstagram = faInstagram;

  constructor() { }

  ngOnInit() {
  }

}
