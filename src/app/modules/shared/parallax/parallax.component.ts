import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-parallax',
  templateUrl: './parallax.component.html',
  styleUrls: ['./parallax.component.scss']
})
export class ParallaxComponent implements OnInit, AfterViewInit {

  @Input() title: string;
  @Input() imgUrl: string;

  @ViewChild('parallax') parallax: ElementRef;
  
  constructor() { }
 
  ngAfterViewInit(): void {
    this.addBackgroundImage();
  }

  ngOnInit(): void {
  }

  private addBackgroundImage(){
    this.parallax.nativeElement.style.backgroundImage = `url(${this.imgUrl})`;
  }
  
}
