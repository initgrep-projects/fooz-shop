import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShopService } from '../../../shop.service';
import { CustomSize } from 'src/app/models/custom-size';
import { ItemDetailService } from '../item-detail.service';

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

  customSize: CustomSize = null;

  constructor(private shopService: ShopService,
              private itemdetailService: ItemDetailService
  ) { }

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

  /**
   *  this method shows or hides the custom size
   * if( customsize is shown) - it is initialized to an empty object
   * else it is set back to null;
   * this helps in validations during the the addToCart function
   * 
   */
  toggleCustomSizeVisibility() {
    this.showCustomSize = !this.showCustomSize;
    if (!!this.showCustomSize) {
      this.customSize = new CustomSize();
      this.addValuesToCustomSize();
    } else {
      this.customSize = null;
      this.addValuesToCustomSize();
    }
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  setSelectedWidth(w: number) {
    this.customSize.setWidth(w);
    this.addValuesToCustomSize();
  }
  setSelectedLength(l: number) {
    this.customSize.setLength(l);
    this.addValuesToCustomSize();
  }
  setSelectedBust(b: number) {
    this.customSize.setBust(b);
    this.addValuesToCustomSize();
  }
  setSelectedArm(a: number) {
    this.customSize.setArm(a);
    this.addValuesToCustomSize();
  }
  setSelectedHip(h: number) {
    this.customSize.setHip(h);
    this.addValuesToCustomSize();
  }

  addValuesToCustomSize() {
    // if (this.itemdetailService.isValidCustomSize(this.customSize)) {
    // console.log('all values are set to custom size ', this.customSize);
    this.itemdetailService.setCustomSize(this.customSize);
    // }
  }
}
