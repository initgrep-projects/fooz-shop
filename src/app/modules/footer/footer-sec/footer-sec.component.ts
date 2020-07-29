import { Component, OnInit, Input } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { footerLables } from 'src/app/util/app.labels';

@Component({
  selector: 'app-footer-sec',
  templateUrl: './footer-sec.component.html',
  styleUrls: ['./footer-sec.component.scss']
})
export class FooterSecComponent implements OnInit {
  labels = footerLables
  @Input() brand: Brand;
  constructor() { }

  ngOnInit(): void {
  }

}
