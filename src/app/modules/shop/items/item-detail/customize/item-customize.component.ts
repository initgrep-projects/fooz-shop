import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShopService } from '../../../shop.service';

@Component({
  selector: 'app-item-customize',
  templateUrl: './item-customize.component.html',
  styleUrls: ['./item-customize.component.scss']
})
export class ItemCustomizeComponent implements OnInit, OnDestroy {

  subs: Subscription[] = [];

  widthSizeValues: number[] = [];
  lengthSizeValues: number[] = [];
  bustSizeValues: number[] = [];
  armSizeValues: number[] = [];
  hipSizeValues: number[] = [];

  showCustomSize = false;

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.addCustomSizeInputsToStore();
  }

  addCustomSizeInputsToStore() {
    this.subs[this.subs.length + 1] =
      this.shopService.dispatachCustomSizeInputsToStore().subscribe(data => {
        this.getCustomSizeInputs();
      });
  }

  getCustomSizeInputs() {
    this.subs[this.subs.length + 1] =
      this.shopService.getShopFromStore()
        .subscribe(state => {
          this.widthSizeValues = state.customSizeInput.Width;
          this.lengthSizeValues = state.customSizeInput.Length;
          this.armSizeValues = state.customSizeInput.Arm;
          this.bustSizeValues = state.customSizeInput.Bust;
          this.hipSizeValues = state.customSizeInput.Hip;
        });
  }

  toggleCustomSizeVisibility() {
    this.showCustomSize = !this.showCustomSize;
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
