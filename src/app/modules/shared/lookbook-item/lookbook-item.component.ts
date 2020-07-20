import { Component, OnInit, Input } from '@angular/core';
import { LookBookItem } from 'src/app/models/lookbook';
import { homeLabels} from 'src/app/util/app.labels';

@Component({
  selector: 'app-lookbook-item',
  templateUrl: './lookbook-item.component.html',
  styleUrls: ['./lookbook-item.component.scss']
})
export class LookbookItemComponent implements OnInit {
  labels = homeLabels;
  @Input('item') item: LookBookItem;
  
  constructor() { }

  ngOnInit(): void {
  }

  encode(url:string){
    return encodeURIComponent(url);
  }
}
