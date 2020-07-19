import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild, ElementRef, DoCheck } from '@angular/core';
import { SubSink } from 'subsink';
import { AuthMessages } from '../../../util/app.labels';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-auth-popup',
  templateUrl: './auth-popup.component.html',
  // encapsulation: ViewEncapsulation.None,
  styleUrls: ['./auth-popup.component.scss']
})
export class AuthPopupComponent implements OnInit, OnDestroy, DoCheck {
  private subs = new SubSink();
  labels = AuthMessages.authAnchorLabels;
  
  @ViewChild(NgbPopover) popover: NgbPopover;

  constructor(private elementRef: ElementRef) { }

  ngDoCheck() {
    const popoverElement: HTMLElement = this.elementRef.nativeElement.querySelector('.pop-style');
    if (!!popoverElement) {
      popoverElement.addEventListener('mouseleave', () => {
        this.closePopover();
      });
    }
  }
  ngOnInit(): void {}

  closePopover() {
    if (!!this.popover) {
      this.popover.close();
    }
  }

  openPopover() {
    this.popover.open();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
