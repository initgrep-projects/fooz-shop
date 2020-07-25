import { ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { ImageSliderComponent } from './image-slider.component';

@Injectable({
  providedIn: 'root'
})
export class ImageSliderService {

  private componentRef: ComponentRef<ImageSliderComponent>;
  private host: ViewContainerRef;

  constructor(
    private cfr: ComponentFactoryResolver
  ) { }


  open(host: ViewContainerRef): ComponentRef<ImageSliderComponent> {
    console.log('host provided = ', host);
    this.host = host;
    return this.create();
  }

  close(host: ViewContainerRef) {
    this.host.clear();
    this.componentRef.destroy();
  }


  private create() {
    const componentRef = this.cfr.resolveComponentFactory(ImageSliderComponent);
    const vcf = this.host;
    vcf.clear();
    this.componentRef = vcf.createComponent(componentRef);
    return this.componentRef;
  }
}
