import { Component, OnInit } from '@angular/core';
import {AlertsService} from "../../services/alerts.service";

@Component({
  selector: 'app-alerts',
  templateUrl: 'alerts.component.html',
  styleUrls: ['alerts.component.scss']
})
export class AlertsComponent implements OnInit {

  constructor(private alertsService:AlertsService) { }

  ngOnInit() {
  }

}
