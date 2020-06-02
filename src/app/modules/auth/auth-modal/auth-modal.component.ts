import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { AuthModalService } from './auth-modal.service';
import { SubSink } from 'subsink';
import { AuthAccessComponent } from '../auth-access/auth-access.component';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss']
})
export class AuthModalComponent implements OnInit, OnDestroy {

  private subs = new SubSink();
  @ViewChild('tpl') content:TemplateRef<any>
  constructor(private authModalService: AuthModalService) { }

  ngOnInit(): void {
    this.authModalService.openModal(AuthAccessComponent);
    this.subs.sink = this.authModalService.closeModalOnRouteChange().subscribe();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
