import { Component, OnInit, OnDestroy } from '@angular/core';
import { HomeService } from './home.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  subs: Subscription[] = [];

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.addProductsToStore();
  }

  addProductsToStore() {
    this.subs[this.subs.length + 1] =
      this.homeService.dispatchProductsToStore().subscribe();
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
