import { Injectable } from '@angular/core';
import {ParseManager} from "../../models/ParseManager";
import {LogService} from "./log.service";

@Injectable()
export class UsersService {

  constructor(public logService: LogService, public parseManager: ParseManager) {
  }

  getUsers() {
    return this.parseManager.usersGet();
  }

}
