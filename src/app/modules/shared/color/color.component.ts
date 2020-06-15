import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer2, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ItemDetailService } from '../../shop/items/item-detail/item-detail.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit, AfterViewInit {

  @Input() colors: Color[];
  @Input() displaySize: string;
  @Input() disable: boolean = false;
  @ViewChildren('color') colorSpans: QueryList<ElementRef>;
  @Output() SelectionChange = new EventEmitter<Color>();

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    console.log("colors provided  = ", this.colors);
  }

  ngAfterViewInit() {
    this.resizeOn('s');
  }
  /**
   * 
   * @param givenSize s -> small size
   */
  private resizeOn(givenSize: String) {
    if (this.displaySize === givenSize) {
      this.colorSpans.toArray().forEach(de => {
        this.renderer.setStyle(de.nativeElement, 'line-height', '20px');
        this.renderer.setStyle(de.nativeElement, 'width', '20px');
        this.renderer.setStyle(de.nativeElement, 'height', '20px');
        this.renderer.setStyle(de.nativeElement, 'font-size', '0.5rem');
      });
    }
  }
  selectColor(c: Color) {
    if (!this.disable) {
      if (!c.isSelected) {
        this.resetSelection();
        c.select();
        this.SelectionChange.emit(c);
      } else {
        this.resetSelection();
        this.SelectionChange.emit(null);
      }
    }


  }

  resetSelection() {
    this.colors.forEach(c => c.deSelect());
  }

}
