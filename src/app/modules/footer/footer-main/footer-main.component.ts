import { Component, Input, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { footerLables } from 'src/app/util/app.labels';

@Component({
  selector: 'app-footer-main',
  templateUrl: './footer-main.component.html',
  styleUrls: ['./footer-main.component.scss']
})
export class FooterMainComponent implements OnInit {
  labels = footerLables
  @Input() brand: Brand;
  constructor() { }

  ngOnInit(): void {
  }

}
