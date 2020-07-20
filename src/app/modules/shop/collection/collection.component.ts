import { Component, OnInit, Input, AfterContentInit } from '@angular/core';
import { LookBookItem } from 'src/app/models/lookbook';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit , AfterContentInit{

  @Input() item : LookBookItem;
  constructor() { }
  
  ngAfterContentInit(): void {
    console.log('title collection provided ', this.item);  
  }

  ngOnInit(): void {}

  

}
