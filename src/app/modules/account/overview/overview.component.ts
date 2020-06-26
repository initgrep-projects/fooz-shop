import { Component, OnInit } from '@angular/core';
import { fadeIn } from 'src/app/animations/fadeAnimation';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  animations:[
    fadeIn
  ]
})
export class OverviewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
