import { Injectable } from '@angular/core';
import { AppError, AppErrorType } from '../models/app-error';
import { DATA_LOAD_ERROR, DATA_LOAD_ERROR_DETAILS } from '../util/app.constants';

@Injectable({
  providedIn: 'root'
})
export class AppErrorService {

  constructor() { }

  warning(message:string, details:string): AppError{
    return new AppError(AppErrorType.WARNING, message,details);
  }

  failure(message:string, details:string): AppError{
    return new AppError(AppErrorType.FAILURE, message,details);
  }

  dataFetchError(){
    return this.failure(DATA_LOAD_ERROR, DATA_LOAD_ERROR_DETAILS);
  }

}
