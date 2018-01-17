import { Injectable } from '@angular/core';

@Injectable()
export class LogService {

  constructor() { }

  log(message: any){
    console.log(message);
  }

  getTime(){
    var d = new Date();
    return d.getDay() + "." + d.getMonth() + "." + d.getFullYear() + "-" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
  }

}
