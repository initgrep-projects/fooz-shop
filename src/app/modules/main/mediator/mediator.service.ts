import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';

@Injectable({
  providedIn: 'root'
})
export class MediatorService {

  subs = new SubSink();

  constructor(private router:Router) {
    this.subs.sink = 
    this.router.events.subscribe(event => {
     
    })
   }
}
