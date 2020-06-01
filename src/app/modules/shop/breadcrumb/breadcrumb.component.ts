import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { isEmpty } from 'src/app/helpers/util';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  @Input() homePath: string;
  pathItems = [];
  currentPath:string;

  constructor(private location: Location) { }

  ngOnInit(): void {
    console.log('location = ', this.location);
    let paths =  this.location.path().split('?')[0].split('/');
    paths =  paths.filter(p => !!p);
   this.currentPath =  paths.slice(paths.length-1, paths.length)[0];
   console.log('current path = ', this.currentPath);
   this.pathItems = paths.slice(0, paths.length-1);
   console.log('final path items = ', this.pathItems);
  }

}
