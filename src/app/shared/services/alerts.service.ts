import {Injectable} from '@angular/core';
import {LogService} from "./log.service";

@Injectable()
export class AlertsService {

  public alerts: Array<Object> = [];

  constructor(public logService: LogService) { }

  public addAlert(message: string, type = "danger", closable = true){
    this.alerts.push({ msg: message, type: type, closable: closable });
    this.logService.log(this.logService.getTime() + " [" + type +"] - " +message);
  }

  public getAlerts(){
    return this.alerts;
  }

  public closeAlert(i: number): void {
    this.alerts.splice(i, 1);
  }

  public clear(){
    this.alerts = [];
  }

}
