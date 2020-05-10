import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  closeSideBar = new Subject<boolean>();
  openSideBar = new Subject<boolean>();

  constructor() { }

  close() {
    this.closeSideBar.next(true);
  }

  open() {
    this.openSideBar.next(true);
  }

}
