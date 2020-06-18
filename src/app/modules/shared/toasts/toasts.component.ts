import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastService, Toast, toastType } from './toast.service';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss']
})
export class ToastsComponent implements OnInit {

  constructor(public toastService: ToastService) { }

  ngOnInit(): void {
  }

  isTemplate(toast: Toast) {
    const isTemplate = toast.textOrTpl instanceof TemplateRef;
    return isTemplate;
  }

  getClassNameByType(toast:Toast){
    if(!toast.options.type || toast.options.type === toastType.SUCCESS){
      return "bg-dark text-light";
    }
    if(toast.options.type === toastType.ERROR){
      return "bg-danger text-white";
    }else if(toast.options.type === toastType.WARNING){
      return "bg-warning text-dark";
    }
  }

}
