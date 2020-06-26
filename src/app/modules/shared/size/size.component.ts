import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ViewChildren, QueryList, ElementRef, Renderer2 } from '@angular/core';
import { Size } from 'src/app/models/size';
import { staggerFadeIn } from 'src/app/animations/fadeAnimation';

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss'],
  animations: [
    staggerFadeIn
  ]
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
        this.renderer.setStyle(de.nativeElement, 'line-height', '21px');
        this.renderer.setStyle(de.nativeElement, 'width', '23px');
        this.renderer.setStyle(de.nativeElement, 'height', '23px');
        this.renderer.setStyle(de.nativeElement, 'font-size', '0.7rem');
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
