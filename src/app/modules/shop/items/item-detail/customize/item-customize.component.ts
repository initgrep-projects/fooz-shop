import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShopService } from '../../../shop.service';
import { CustomSize } from 'src/app/models/custom-size';
import { ItemDetailService, CZ } from '../item-detail.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-item-customize',
  templateUrl: './item-customize.component.html',
  styleUrls: ['./item-customize.component.scss']
})
export class ItemCustomizeComponent implements OnInit, OnDestroy {

  private subs = new SubSink();

  widthSizeValues: number[] = [];
  lengthSizeValues: number[] = [];
  bustSizeValues: number[] = [];
  armSizeValues: number[] = [];
  hipSizeValues: number[] = [];

  isVisible = false;
  customSize: CustomSize = null;

  constructor(
    private shopService: ShopService,
    private itemdetailService: ItemDetailService
  ) { }

  ngOnInit(): void {
    this.addCustomSizeInputsToStore();
    this.resetCustomSizeOnStdSizeSelection();
    this.listenToSizeTypeChange();
  }

  private listenToSizeTypeChange() {
    this.subs.sink =
      this.itemdetailService.sizeTypeChange.subscribe(type => {
        if (type === CZ) {
          console.log("hide SZ");
          this.isVisible = true;
          this.customSize = new CustomSize();
          // this.addValuesToCustomSize();
        }
      });
  }

  addCustomSizeInputsToStore() {
    this.subs.sink =
      this.shopService.dispatachCustomSizeInputsToStore().subscribe(data => {
        this.getCustomSizeInputs();
      });
  }

  getCustomSizeInputs() {
    this.subs.sink =
      this.shopService.getShopFromStore()
        .subscribe(state => {
          this.widthSizeValues = state.customSizeInput.Width;
          this.lengthSizeValues = state.customSizeInput.Length;
          this.armSizeValues = state.customSizeInput.Arm;
          this.bustSizeValues = state.customSizeInput.Bust;
          this.hipSizeValues = state.customSizeInput.Hip;
        });
  }

  resetCustomSizeOnStdSizeSelection() {
    this.subs.sink =
      this.itemdetailService.sizeChange.subscribe(size => {
        if (!!this.customSize) {
          console.log('If you choose the standard size here, custom size will not be considered.', size);
        }
      });
  }

  hide() {
    this.isVisible = false;
    this.itemdetailService.setStandardSizeType();
    this.customSize = null;
    this.addValuesToCustomSize();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  setSelectedWidth(w: number) {
    this.customSize.Width = w;
    this.addValuesToCustomSize();
  }
  setSelectedLength(l: number) {
    this.customSize.Length = l;
    this.addValuesToCustomSize();
  }
  setSelectedBust(b: number) {
    this.customSize.Bust = b;
    this.addValuesToCustomSize();
  }
  setSelectedArm(a: number) {
    this.customSize.Arm = a;
    this.addValuesToCustomSize();
  }
  setSelectedHip(h: number) {
    this.customSize.Hip = h;
    this.addValuesToCustomSize();
  }

  addValuesToCustomSize() {
    this.itemdetailService.setCustomSize(this.customSize);
  }

}
