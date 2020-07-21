import { Component, OnInit } from '@angular/core';
import { StatusService } from '../shared/status/status.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  constructor(public statusService:StatusService) { }

  ngOnInit() { }

}
