import { Component, OnInit, Input } from '@angular/core';
import { Image } from 'src/app/models/image';

@Component({
  selector: 'app-item-images',
  templateUrl: './item-images.component.html',
  styleUrls: ['./item-images.component.scss']
})
export class ItemImagesComponent implements OnInit {

  @Input() images: Image[];

  constructor() { }

  ngOnInit(): void {
  }

}
