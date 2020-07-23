import { Injectable } from '@angular/core';
import { AppMsg, AppMsgType } from '../models/app-msg';
import { DATA_LOAD_ERROR, DATA_LOAD_ERROR_DETAILS } from '../util/app.constants';

@Injectable({
  providedIn: 'root'
})
export class AppMessageService {

  constructor() { }

  success(message:string, details:string): AppMsg{
    return new AppMsg(AppMsgType.SUCCESS, message,details);
  }
  
  warning(message:string, details:string): AppMsg{
    return new AppMsg(AppMsgType.WARNING, message,details);
  }

  failure(message:string, details:string): AppMsg{
    return new AppMsg(AppMsgType.FAILURE, message,details);
  }

  dataFetchError(){
    return this.failure(DATA_LOAD_ERROR, DATA_LOAD_ERROR_DETAILS);
  }

}
