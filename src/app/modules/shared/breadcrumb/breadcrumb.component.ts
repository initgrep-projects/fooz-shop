import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit, OnDestroy {

  @Input() homePath: string;
  pathItems = [];
  currentPath: string;

  constructor(private location: Location, private router: Router) { }

  ngOnInit(): void {
  this.processPaths(this.location.path());
  
 
  this.location.onUrlChange((url, state) => {
    console.log('location url change = ', url, state);
    this.processPaths(url);
  });

  }

  private processPaths(path:string){
    let paths = path.split('?')[0].split('/');
    paths = paths.filter(p => !!p);
    this.currentPath = paths.slice(paths.length - 1, paths.length)[0];
    console.log('current path = ', this.currentPath);
    this.pathItems = paths.slice(0, paths.length - 1);
    console.log('final path items = ', this.pathItems);
  }

  ngOnDestroy(){
  
  }

}
