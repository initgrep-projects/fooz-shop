import { Component, OnInit, Input, AfterContentInit } from '@angular/core';
import { Image } from 'src/app/models/image';
import { isEmpty } from 'lodash';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-item-images',
  templateUrl: './item-images.component.html',
  styleUrls: ['./item-images.component.scss']
})
export class ItemImagesComponent implements OnInit, AfterContentInit {

  @Input() images: Image[];
  selectedImage: Image[] = [];
  currentIndex: number;

  constructor() { }

  ngAfterContentInit() {
    this.selectImage(this.images[0]);
    this.currentIndex = 0;
  }

  ngOnInit(): void {

  }

  selectImage(image: Image) {
    if (!isEmpty(this.selectedImage)) {
      this.selectedImage = [];
    }
    this.selectedImage = [image];
  }

  goToNextImage(isLeft: boolean) {
    if (isLeft) {
      if (this.currentIndex >= 0) {
        this.selectImage(this.images[this.currentIndex--]);
      } else {
        this.currentIndex = 0;
      }
    } else {
      console.log('curr index : lenth', this.currentIndex, this.images.length);
      if (this.currentIndex < this.images.length - 1) {
        this.selectImage(this.images[++this.currentIndex]);
      } else {
        this.currentIndex = this.images.length - 1;
      }

    }
  }

}
