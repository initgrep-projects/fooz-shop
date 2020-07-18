import { Component, OnInit, ViewChild, ElementRef, OnDestroy, Input, AfterViewInit, Renderer2 } from '@angular/core';
import { SidebarService } from './sidebar.service';
import { SubSink } from 'subsink';

const MOBILE_WIDTH = 75;
const DESKTOP_WIDTH = 25;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('sidenav') sideNav: ElementRef;
  @ViewChild('sidenavMask') sideNavMask: ElementRef;
  isOpen = false;



  private subs = new SubSink();

  constructor(
    private sidebarService: SidebarService,
    private renderer: Renderer2) { }

  @Input('from') from: string;
  @Input('bgColor') bgColor: string;


  ngAfterViewInit(): void {
    this.setInitalParameters(this.getMediaForMobileTablet());
  }

  ngOnInit(): void {
    this.enableOpen();
    this.enableClose();
  }

  open() {
    this.sidebarService.open();
  }

  close() {
    this.sidebarService.close();
  }

  private enableOpen() {
    this.subs.sink =
      this.sidebarService.openSideBar.subscribe(status => {
        this.isOpen = true;
        this.renderer.setStyle(this.sideNavMask.nativeElement, 'width', '100%');
        this.addSidenavWidth();
        this.subscribeToWidthChange();
      });
  }

  private enableClose() {
    this.subs.sink =
      this.sidebarService.closeSideBar.subscribe(status => {
        this.isOpen = false;

        this.setInitalParameters(this.getMediaForMobileTablet());
      });
  }

  private setInitalParameters(mq: MediaQueryList | MediaQueryListEvent) {
    this.sideNav.nativeElement.style.backgroundColor = !!this.bgColor ? this.bgColor : '#f1f1f1';
    const isMobileTablet = mq.matches;
    if (this.from === 'right') {
      this.renderer.setStyle(this.sideNavMask.nativeElement, 'right', '-200%');
      this.renderer.setStyle(this.sideNavMask.nativeElement, 'left', 'auto');
      this.renderer.setStyle(this.sideNav.nativeElement, 'right', isMobileTablet ? `-${100 + MOBILE_WIDTH}%` : `-${100 + DESKTOP_WIDTH}%`);
    } else {
      this.renderer.setStyle(this.sideNavMask.nativeElement, 'left', '-100%');
      this.renderer.setStyle(this.sideNavMask.nativeElement, 'right', 'auto');
      this.renderer.setStyle(this.sideNav.nativeElement, 'left', isMobileTablet ? `-${MOBILE_WIDTH}%` : `-${DESKTOP_WIDTH}%`);
    }
  }

  private getMediaForMobileTablet() {
    console.log("matchmedia = ", window.matchMedia('(max-width: 992px)'));
    if (!!window.matchMedia) {
      return window.matchMedia('(max-width: 992px)');
    }
    return undefined;
  }

  private addSidenavWidth() {
    this.changeWidth(this.getMediaForMobileTablet());
  }

  private subscribeToWidthChange() {
    this.getMediaForMobileTablet()
      .addEventListener('change', (mq) => this.changeWidth(mq));
  }

  private changeWidth(mq: MediaQueryList | MediaQueryListEvent) {
    if (this.isOpen) {
      const isMobileTablet = mq.matches;
      this.renderer.setStyle(this.sideNav.nativeElement, 'width', isMobileTablet ? `${MOBILE_WIDTH}%` : `${DESKTOP_WIDTH}%`);
      this.renderer.setStyle(this.sideNavMask.nativeElement, 'width', '100%');
      if (this.from === 'right') {
        this.renderer.setStyle(this.sideNavMask.nativeElement, 'right', '0');
        this.renderer.setStyle(this.sideNav.nativeElement, 'right', '0');
        this.renderer.setStyle(this.sideNav.nativeElement, 'box-shadow', '-3px 0px 5px 1px #3f3e3f52');
        
      } else {
        this.renderer.setStyle(this.sideNavMask.nativeElement, 'left', '0');
        this.renderer.setStyle(this.sideNav.nativeElement, 'left', '0');
        this.renderer.setStyle(this.sideNav.nativeElement, 'box-shadow', '3px 0px 5px 1px #3f3e3f52');
      }

    }

  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
