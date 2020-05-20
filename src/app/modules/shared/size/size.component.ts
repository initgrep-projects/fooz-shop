import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ViewChildren, QueryList, ElementRef, Renderer2 } from '@angular/core';
import { Size } from 'src/app/models/size';

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss']
})
export class SizeComponent implements OnInit, AfterViewInit {

  @Input() sizes: Size[];
  @Input() displaySize: string;
  @Output() SelectionChange = new EventEmitter<Size>();
  @ViewChildren('size') sizeSpans: QueryList<ElementRef>;


  constructor(private renderer:Renderer2) { }

  ngOnInit(): void { }

  
  ngAfterViewInit() {
    this.resizeOn('s');
  }

  /**
   * 
   * @param givenSize s -> small size
   */
  private resizeOn(givenSize:String){
    if (this.displaySize === givenSize) {
      this.sizeSpans.toArray().forEach(de => {
        this.renderer.setStyle(de.nativeElement, 'line-height', '17px');
        this.renderer.setStyle(de.nativeElement, 'width', '20px');
        this.renderer.setStyle(de.nativeElement, 'height', '20px');
        this.renderer.setStyle(de.nativeElement, 'font-size', '0.6rem');
      });
    }
  }

  selectSize(s: Size) {
    if(!s.isSelected){
      this.resetSelection();
      s.select();
      this.SelectionChange.emit(s);
    }
  }

  resetSelection() {
    this.sizes.forEach(size => size.deSelect());
  }



}
