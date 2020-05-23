import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Size } from 'src/app/models/size';
import { ItemDetailService, CZ, SZ } from '../item-detail.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-item-size',
  templateUrl: './item-size.component.html',
  styleUrls: ['./item-size.component.scss']
})
export class ItemSizeComponent implements OnInit, OnDestroy {

  @Input() sizes: Size[];
  isVisible = true;
  subs = new SubSink();

  constructor(private itemDetailService: ItemDetailService) { }


  ngOnInit(): void {
    this.listenToSizeTypeChange();
  }

  private listenToSizeTypeChange(){
    this.subs.sink = 
    this.itemDetailService.sizeTypeChange.subscribe(type => {
      if(type === SZ){
        console.log("hide CZ");
        this.isVisible = true;
      }
    });
  }

  hide(){
    this.isVisible =  false;
    this.resetSelection();  
    this.itemDetailService.setCustomSizeType();
  }

  onSelectionChange(s: Size) {
      this.itemDetailService.setSelectedSize(s);
  }

  resetSelection() {
    this.sizes.forEach(size => size.deSelect());
    this.itemDetailService.setSelectedSize(null);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
