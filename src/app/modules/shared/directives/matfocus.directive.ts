import { Directive, ElementRef, Input, OnInit, HostListener, HostBinding } from '@angular/core';
import { stringify } from 'querystring';

@Directive({
  selector: '[appMatfocus]'
})
export class MatfocusDirective implements OnInit {
  @Input('ele') element: ElementRef;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    const value = this.elementRef.nativeElement.value;
    console.log('input event triggered -> ', value);
    const nextSibling = this.elementRef.nativeElement.nextSibling;
    if (!!value) {
      this.addStylesForValuedInput(nextSibling);
    }
  }

  @HostListener('input')
  input(data: Event) {
    this.addlabelStyle()
  }

  addlabelStyle() {
    const value = this.elementRef.nativeElement.value;
    const nextSibling = this.elementRef.nativeElement.nextSibling;
    if (!!value) {
      this.addStylesForValuedInput(nextSibling);
    } else {
      nextSibling.style = "";
    }
  }

  addStylesForValuedInput(nextSibling: any) {
    nextSibling.style.top = '-50px';
    nextSibling.style.fontWeight = '600';
    nextSibling.style.textTransform = 'uppercase';
    nextSibling.style.marginLeft = '0rem';
    nextSibling.style.transition = 'all 0.2s ease';
    nextSibling.style.fontSize = '0.7rem';
    nextSibling.style.letterSpacing = '0.1rem';
    nextSibling.style.top = '-50px';
  }


}
