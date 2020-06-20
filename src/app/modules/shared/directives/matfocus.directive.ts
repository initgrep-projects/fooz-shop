import { Directive, ElementRef, Input } from '@angular/core';
import { stringify } from 'querystring';

@Directive({
  selector: '[appMatfocus]'
})
export class MatfocusDirective {
  @Input() element:ElementRef;

  constructor(private elementRef: ElementRef) {

    console.log('appMatfocus input = ', this.element);
  }



}
