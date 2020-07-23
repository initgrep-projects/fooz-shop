import { Component, OnInit } from '@angular/core';
import { StatusService } from '../shared/status/status.service';
import { HeaderService } from '../header/header.service';
import { footerLables } from 'src/app/util/app.labels';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  labels = footerLables
  
  constructor(
    public hs:HeaderService,
    public ss:StatusService) { }

  ngOnInit() {
  }

}
