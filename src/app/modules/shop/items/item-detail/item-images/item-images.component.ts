import { AfterContentInit, Component, Input, OnChanges, OnInit } from '@angular/core';
import { isEmpty } from 'lodash';
import { Image } from 'src/app/models/image';

@Component({
  selector: 'app-item-images',
  templateUrl: './item-images.component.html',
  styleUrls: ['./item-images.component.scss']
})
export class ItemImagesComponent implements OnInit, AfterContentInit, OnChanges {

  @Input() images: Image[];
  selectedImage: Image[] = [];
  currentIndex: number;

  constructor(

  ) { }



  ngAfterContentInit() {
    this.selectImage(this.images[0]);
    this.currentIndex = 0;
  }


  ngOnInit(): void {
  }

  ngOnChanges() {
    this.selectImage(this.images[0]);
    this.currentIndex = 0;
  }

  updateImageAndIndex(image: Image, index: number) {
    this.selectImage(image);
    this.currentIndex = index;
  }
  selectImage(image: Image) {
    if (!isEmpty(this.selectedImage)) {
      this.selectedImage = [];
    }
    this.selectedImage = [image];
  }

  goToNextImage(isLeft: boolean) {
    if (isLeft) {
      if (this.currentIndex > 0) {
        --this.currentIndex;
        this.selectImage(this.images[this.currentIndex]);
      }
    } else {
      if (this.currentIndex < this.images.length - 1) {
        this.currentIndex++;
        this.selectImage(this.images[this.currentIndex]);
      }
    }
  }
  scrollLeft(event) {
    this.goToNextImage(false);
  }

  scrollRight(event) {
    this.goToNextImage(true);
  }

}
