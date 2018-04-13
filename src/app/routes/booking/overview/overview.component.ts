import { Component, OnInit } from '@angular/core';
import {LogService} from "../../../shared/services/log.service";
import {ParseManager} from "../../../models/ParseManager";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {


  orders = [];


  constructor(private logService:LogService, private parseManager: ParseManager ) { }

  ngOnInit() {
    var self = this;
    self.parseManager.ordersGet()
      .then(function success(orders) {
        self.orders = orders;
      });
  }

}
