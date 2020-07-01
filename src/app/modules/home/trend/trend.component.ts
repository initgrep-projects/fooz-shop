import { Component, OnInit } from '@angular/core';
import { fadeIn } from 'src/app/animations/fadeAnimation';
import { HomeService } from '../home.service';


@Component({
  selector: 'app-trend',
  templateUrl: './trend.component.html',
  styleUrls: ['./trend.component.scss'],
  animations: [
    fadeIn
  ]
})
export class TrendComponent implements OnInit {

  constructor(public hs: HomeService) { }

  ngOnInit() {
  }



}
