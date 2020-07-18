import { Component, OnInit, TemplateRef } from '@angular/core';
import { Toast, ToastService, toastType } from './toast.service';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss']
})
export class ToastsComponent implements OnInit {

  private defaultIcon = "exclamation-circle";

  constructor(public toastService: ToastService) { }

  ngOnInit(): void {
  }

  isTemplate(toast: Toast) {
    const isTemplate = toast.textOrTpl instanceof TemplateRef;
    return isTemplate;
  }

  getClassNameByType(toast: Toast) {
    if (!toast.options.type || toast.options.type === toastType.SUCCESS) {
      return "bg-darkest text-light";
    }
    if (toast.options.type === toastType.ERROR) {
      return "bg-danger text-white";
    } else if (toast.options.type === toastType.WARNING) {
      return "bg-warning text-dark";
    }
  }

  getIcon(toast: Toast) {
    if (!!toast.options.icon) {
      return toast.options.icon;
    }
    return this.defaultIcon;
  }


}
