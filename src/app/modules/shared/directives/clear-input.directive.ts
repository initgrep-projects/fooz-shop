import { Directive, Input, ElementRef, HostListener, OnInit, OnChanges, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { isEmpty } from 'lodash';
import { NgControl, AbstractControl } from '@angular/forms';

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
