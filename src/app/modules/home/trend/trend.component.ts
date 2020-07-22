import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { fadeIn } from 'ng-animate';
import { HomeService } from '../home.service';


@Component({
  selector: 'app-trend',
  templateUrl: './trend.component.html',
  styleUrls: ['./trend.component.scss'],
  animations: [
    trigger('fadeIn', [transition('* => *', useAnimation(fadeIn))])
  ]
})
export class TrendComponent implements OnInit {

  constructor(public hs: HomeService) { }

  ngOnInit() {
  }



}
