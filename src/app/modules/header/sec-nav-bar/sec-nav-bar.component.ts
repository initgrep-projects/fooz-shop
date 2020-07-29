import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { fadeIn } from 'ng-animate';
import { Brand } from 'src/app/models/brand';

@Component({
  selector: 'app-sec-nav-bar',
  templateUrl: './sec-nav-bar.component.html',
  styleUrls: ['./sec-nav-bar.component.scss'],
  animations: [
    trigger('fadeIn', [transition(':enter', useAnimation(fadeIn, {
      // Set the duration to 5seconds and delay to 2seconds
      params: { timing: 1 }
    }))])
  ]
})
export class SecNavBarComponent implements OnInit {

  @Input() brand: Brand
  @Input() isCheckoutRoute: boolean
  @Output() back = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  
  goBack() {
    this.back.emit();
  }

}
