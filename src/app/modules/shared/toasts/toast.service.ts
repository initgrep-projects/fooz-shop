import { Injectable, TemplateRef } from '@angular/core';


export interface Toast {
  textOrTpl: string | TemplateRef<any>,
  options?: ToastOptions
}
export interface ToastOptions {
  classname?: string,
  delay?: string
  icon?: string
}
@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toasts: Toast[] = [];

  constructor() { }

  /**
   * 
   * @param textOrTpl @param textOrTpl show('Item added to Card Successfully ', { classname: 'bg-dark text-light fadeInDown', delay: 5000 })
   * @param options 
   */
  show(_textOrTpl: string | TemplateRef<any>, options: ToastOptions = {}) {
    const toast: Toast = {
      textOrTpl: _textOrTpl,
      options: { ...options }
    };
    this.toasts.push(toast);
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
