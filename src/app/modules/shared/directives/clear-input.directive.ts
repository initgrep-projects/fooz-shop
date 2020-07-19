import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { AbstractControl, NgControl } from '@angular/forms';
import { isEmpty } from 'lodash';

@Directive({
  selector: '[appClearInput]'
})
export class ClearInputDirective implements OnInit {
  @Input('appClearInput') controls: AbstractControl[] = [];

  constructor(
    private elementRef: ElementRef,
    private control: NgControl
  ) { }

  ngOnInit() {

  }

  @HostListener('change')
  change() {
    const value = this.control.value;
    if (!!value) {
      if (!isEmpty(this.controls)) {
        this.controls.forEach(control => {
          if (!!control.value) {
            control.reset();
          }
        });
      }
    }

  }



}
