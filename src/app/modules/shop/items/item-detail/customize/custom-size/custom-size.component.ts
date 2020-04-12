import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

const SPACE = ' ';

@Component({
  selector: 'app-custom-size',
  templateUrl: './custom-size.component.html',
  styleUrls: ['./custom-size.component.scss']
})
export class CustomSizeComponent implements OnInit {

  @Input() label: string;
  @Input() unit: string;
  @Input() icon: string;
  @Input() values: number[];
  @Output() selection = new EventEmitter<number>();

  selectedValue: string;
  constructor() { }

  ngOnInit(): void {
    this.setinitialSelectedValue();
   }


   setinitialSelectedValue() {
    this.selectedValue =  'select';
   }

  setSelectedValue(value: number)  {
    this.selectedValue = value + SPACE + this.unit;
    this.selection.emit(value);
  }
  getSelectedValue() {
    return this.selectedValue;
  }

}
