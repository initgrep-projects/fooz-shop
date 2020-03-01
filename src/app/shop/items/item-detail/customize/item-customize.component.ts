import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-customize',
  templateUrl: './item-customize.component.html',
  styleUrls: ['./item-customize.component.scss']
})
export class ItemCustomizeComponent implements OnInit {


  widthSizeValues: number[] = [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34];
  lengthSizeValues: number[] = [50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64];
  bustSizeValues: number[] = [33, 34, 35, 36, 37];
  armSizeValues: number[] = [15, 16, 17, 18, 19, 20];
  constructor() { }

  ngOnInit(): void {
  }

}
