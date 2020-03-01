import { Component, OnInit, Input } from '@angular/core';

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
  @Input() values: string[];
 

  selectedValue: string;
  constructor() { }

  ngOnInit(): void {
    this.setinitialSelectedValue();
   }


   setinitialSelectedValue() {
    this.selectedValue =  'select' + SPACE + this.label ;
   }
  setSelectedValue(value: string)  {
    this.selectedValue = value + SPACE + this.unit;
  }
  getSelectedValue() {
    return this.selectedValue;
  }

}
