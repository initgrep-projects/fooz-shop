import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toasts: any[] = [];

  constructor() { }

  /**
   * 
   * @param textOrTpl @param textOrTpl show('Item added to Card Successfully ', { classname: 'bg-dark text-light fadeInDown', delay: 5000 })
   * @param options 
   */
  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
