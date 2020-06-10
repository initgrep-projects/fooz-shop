import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastService, Toast } from './toast.service';

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
    console.log('isTemplate in toast = ', isTemplate);
    return isTemplate;
  }

}
