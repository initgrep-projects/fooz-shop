import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Size } from 'src/app/models/size';
import { ItemDetailService } from '../item-detail.service';
import { Subscription } from 'rxjs';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-item-size',
  templateUrl: './item-size.component.html',
  styleUrls: ['./item-size.component.scss']
})
export class ItemSizeComponent implements OnInit, OnDestroy {

  @Input() sizes: Size[];
  isVisible = true;

  constructor(private itemDetailService: ItemDetailService) { }

  subs = new SubSink();

  ngOnInit(): void {
  
  }

  toggleVisibility(){
    //@TODO
  }

  onSelectionChange(s: Size) {
      this.itemDetailService.setSelectedSize(s);
  }

  // resetSelectionOnCustomSize() {
  //   this.subs.sink = 
  //   this.itemDetailService.onCustomSizeChange
  //   .subscribe(cz => this.resetSelection());
  // }

  // resetSelection() {
  //   this.sizes.forEach(size => size.deSelect());
  // }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
