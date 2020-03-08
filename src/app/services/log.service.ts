import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() { }

  info(...message: any) {
    console.log(new Date() + ':', ...message);
  }
}
