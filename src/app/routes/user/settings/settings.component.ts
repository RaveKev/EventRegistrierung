import { Component, OnInit } from '@angular/core';
import {ParseManager} from "../../../models/ParseManager";
import {LogService} from "../../../shared/services/log.service";


@Component({
    selector: 'app-settings',
    templateUrl: 'settings.component.html',
    styleUrls: ['settings.component.scss']
})
export class SettingsComponent implements OnInit {

    settingActive = 1;
    user = null;
    profile = null;

    constructor(private logService:LogService, private parseManager:ParseManager) { }

    ngOnInit() {
      var self = this;
      this.user = this.parseManager.currentUser();
      console.log(this.user);
      this.parseManager.profileGetByUserId(this.user.id)
        .then(function (prof){
          self.profile = prof;
          console.log(self.profile);
        })
    }

}
