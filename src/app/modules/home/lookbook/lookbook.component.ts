import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HomeService } from '../home.service';
import { staggerFadeIn } from 'src/app/animations/fadeAnimation';

@Component({
  selector: 'app-lookbook',
  templateUrl: './lookbook.component.html',
  styleUrls: ['./lookbook.component.scss'],
  animations: [
    staggerFadeIn
  ]
})
export class LookbookComponent implements OnInit, OnDestroy {

  subs: Subscription[] = [];

  constructor(
    public homeService: HomeService
  ) { }

  ngOnInit() {

  }

  

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
