import { Component, OnInit, ViewChild, ElementRef, OnDestroy, Input, AfterViewInit, Renderer2 } from '@angular/core';
import { SidebarService } from './sidebar.service';
import { SubSink } from 'subsink';

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
    this.initialize();
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
        this.renderer.setStyle(this.sideNavMask.nativeElement, 'width','100%');
        this.addSidenavWidth();
        this.subscribeToWidthChange();
      });
  }

  private enableClose() {
    this.subs.sink =
      this.sidebarService.closeSideBar.subscribe(status => {
        this.isOpen = false;
        this.renderer.setStyle(this.sideNavMask.nativeElement, 'width','0px');
        this.renderer.setStyle(this.sideNav.nativeElement, 'width','0px');
      });
  }
  private initialize() {
    this.sideNav.nativeElement.style.backgroundColor = !!this.bgColor ? this.bgColor : '#f1f1f1';
    if (this.from === 'right') {
      this.renderer.setStyle(this.sideNav.nativeElement, 'right','0');
    } else {
      this.renderer.setStyle(this.sideNav.nativeElement, 'left','0');
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
      if (isMobileTablet) {
        this.renderer.setStyle(this.sideNav.nativeElement, 'width', '100%');
      } else {
        this.renderer.setStyle(this.sideNav.nativeElement, 'width', '25%');
      }
    }

  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
