import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-size-filter',
  templateUrl: './size-filter.component.html',
  styleUrls: ['./size-filter.component.scss']
})
export class SizeFilterComponent implements OnInit {

  sizeValues: string[] = ['S', 'M', 'L', 'XL'];
  constructor() { }

  ngOnInit(): void {
  }

  getSizeLabel(s: string){
    if (s === 'S') { return 'Small'; }
    if (s === 'M') { return 'Medium'; }
    if (s === 'L') { return 'Large'; }
    if (s === 'XL') { return 'Extra Large'; }
  }

}
