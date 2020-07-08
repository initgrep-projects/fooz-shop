import { Directive, ElementRef, Input, OnInit, HostListener } from '@angular/core';

@Directive({
  selector: '[appMatfocus]'
})
export class MatfocusDirective implements OnInit {
  @Input('appMatfocus') labelId: string;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    const value = this.elementRef.nativeElement.value;
    const nextSibling = this.getLabel(this.elementRef.nativeElement);
    if (!!value) {
      this.addStylesForValuedInput(nextSibling);
    }
  }

  @HostListener('input')
  input(data: Event) {
    this.addlabelStyle()
  }

  @HostListener('mouseout')
  mouseOut() {
    this.addlabelStyle();
  }

  addlabelStyle() {
    const value = this.elementRef.nativeElement.value;
    const nextSibling = this.getLabel(this.elementRef.nativeElement);
    if (!!value) {
      this.addStylesForValuedInput(nextSibling);
    } else {
      nextSibling.style = "";

    }
  }

  addStylesForValuedInput(nextSibling: any) {

    nextSibling.style.top = '-60px';
    nextSibling.style.fontWeight = '600';
    nextSibling.style.textTransform = 'uppercase';
    nextSibling.style.marginLeft = '0rem';
    nextSibling.style.transition = 'all 0.2s ease';
    nextSibling.style.fontSize = '0.7rem';
    nextSibling.style.letterSpacing = '0.1rem';

  }

  getLabel(element: any) {
    if (!this.labelId) {
      return element.nextElementSibling;
    } else if (element.nextElementSibling.id === this.labelId && element.nextElementSibling.nodeName === 'LABEL') {
      return element.nextElementSibling;
    }
    else {
      return this.getLabel(element.nextElementSibling);
    }

  }






}
