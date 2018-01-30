import { Injectable } from '@angular/core';
import {ParseManager} from "../../models/ParseManager";
import {LogService} from "./log.service";

@Injectable()
export class UsersService {

  constructor(private logService: LogService, private parseManager: ParseManager) {
  }

  getUsers() {
    return this.parseManager.usersGet();
  }

}
