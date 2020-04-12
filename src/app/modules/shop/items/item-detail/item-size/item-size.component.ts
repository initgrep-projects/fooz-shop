import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Size } from 'src/app/models/size';
import { ItemDetailService } from '../item-detail.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-item-size',
  templateUrl: './item-size.component.html',
  styleUrls: ['./item-size.component.scss']
})
export class ItemSizeComponent implements OnInit, OnDestroy {

  @Input() sizes: Size[];
  constructor(private itemDetailService: ItemDetailService) { }

  subs: Subscription[] = [];

  ngOnInit(): void {
    this.subs[this.subs.length + 1] =
    this.itemDetailService.onCustomSizeChange
    .subscribe(cz => this.resetSelection());
  }

  selectSize(s: Size) {
    if (s.isSelected()) {
      this.resetSelection();
    } else {
      this.resetSelection();
      s.select();
    }
    this.itemDetailService.setSelectedSize(this.sizes);
  }

  resetSelection() {
    this.sizes.forEach(size => size.deSelect());
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
