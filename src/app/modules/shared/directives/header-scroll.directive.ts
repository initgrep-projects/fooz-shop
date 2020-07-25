import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, HostListener, Inject, Optional, Renderer2 } from '@angular/core';

const TABLET_SCREEN_SIZE = '768px';

@Directive({
  selector: '[appHeaderScroll]'
})
export class HeaderScrollDirective {

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    @Optional() @Inject(DOCUMENT) private document: Document
  ) { }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
    if (!this.isMobile()) {
      const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

      const topElement = this.elementRef.nativeElement.children[0];
      const brand = topElement.children[0].children[1].children[0];
      const brandName = topElement.children[0].children[1].children[1];

      if (number > 50) {
        this.renderer.setStyle(topElement, 'padding', '0');
        this.renderer.setStyle(topElement, 'transition', 'padding .5s ease-out')
        this.renderer.setStyle(brand, 'transition', 'font-size .2s ease-out');
        this.renderer.setStyle(brandName, 'transition', 'font-size .2s ease-out');
        this.renderer.setStyle(brand, 'font-size', '2rem');
        this.renderer.setStyle(brandName, 'font-size', '1.5rem');
      }
      else if (number === 0) {
        this.renderer.setStyle(topElement, 'padding', '1rem');
        this.renderer.setStyle(brand, 'font-size', '3rem');
        this.renderer.setStyle(brandName, 'font-size', '2rem');
      }
    }
  }

  private isMobile() {
    if (!!window.matchMedia) {
      return window.matchMedia("(max-width: 768px)").matches
    }
    return false;
  }





}
