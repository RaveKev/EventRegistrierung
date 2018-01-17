import { Component, OnInit } from '@angular/core';
import {ParseManager} from "../../../models/ParseManager";
import {LogService} from "../../../shared/services/log.service";
import {Seminar} from "../../../models/seminar-model";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  seminars : Seminar[];
  constructor(private logService:LogService, private parseManager: ParseManager ) { }

  ngOnInit() {
    var self = this;
    this.parseManager.seminarsGet()
      .then(function success(seminars){
        self.seminars = seminars;
      });
    this.logService.log("Fertig mit getten:");
    this.logService.log(this.seminars);
  }

}
