import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-trend',
  templateUrl: './trend.component.html',
  styleUrls: ['./trend.component.scss'],
  
})
export class TrendComponent implements OnInit {

  constructor() { }
  

  images = [
    'https://i.imgur.com/TOgkCkT.jpg',
    'https://i.imgur.com/QTggRYH.jpg?1',
    'https://i.imgur.com/TOgkCkT.jpg'
  ];


  ngOnInit() {
  }

}
