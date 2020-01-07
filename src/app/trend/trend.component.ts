import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trend',
  templateUrl: './trend.component.html',
  styleUrls: ['./trend.component.scss']
})
export class TrendComponent implements OnInit {

  constructor() { }

  images = [
    '../../assets/images/poster.jpeg',
    '../../assets/images/poster2.jpeg',
    '../../assets/images/poster3.jpeg'
  ]

  ngOnInit() {
  }

}
