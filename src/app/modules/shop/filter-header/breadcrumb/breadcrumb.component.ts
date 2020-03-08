import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  @Input() prevPaths: string[];
  @Input() currentPath: string;
  constructor() { }

  ngOnInit(): void {
  }

}
