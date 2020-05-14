import { Component, OnInit, OnDestroy } from '@angular/core';
import { HomeService } from '../home.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-trend',
  templateUrl: './trend.component.html',
  styleUrls: ['./trend.component.scss'],

})
export class TrendComponent implements OnInit, OnDestroy {

  constructor(private homeService: HomeService) { }

  subs: Subscription[] = [];

  trendImages: string[] = [];


  ngOnInit() {
    this.storeTrendItems();
    this.getTrendItemsFromStore();
  }

  storeTrendItems() {
    this.subs[this.subs.length + 1] =
      this.homeService.dispatchTrendItemsToStore().subscribe();
  }

  getTrendItemsFromStore() {
    this.subs[this.subs.length + 1] =
      this.homeService.getHomePageStore()
        .subscribe(state => {
          console.log("trendImages = ", state.trendItems);
          this.trendImages = state.trendItems;
        });
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }



}
