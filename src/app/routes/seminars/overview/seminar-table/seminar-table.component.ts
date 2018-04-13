import {Component, OnInit, Input} from '@angular/core';
import {Seminar} from "../../../../models/seminar-model";

import { ColorsService } from '../../../../shared/colors/colors.service';

@Component({
  selector: 'app-seminar-table',
  templateUrl: 'seminar-table.component.html',
  styleUrls: ['seminar-table.component.scss']
})
export class SeminarTableComponent implements OnInit {

  pieOptionDanger = {
    animate: {
      duration: 800,
      enabled: true
    },
    barColor: this.colors.byName('danger'),
    trackColor: false,
    scaleColor: this.colors.byName('gray'),
    lineWidth: 15,
    lineCap: 'circle'
  };

  pieOptionOK = {
    animate: {
      duration: 800,
      enabled: true
    },
    barColor: this.colors.byName('success'),
    trackColor: false,
    scaleColor: this.colors.byName('gray'),
    lineWidth: 15,
    lineCap: 'circle'
  };

  pieOptionWarning = {
    animate: {
      duration: 800,
      enabled: true
    },
    barColor: this.colors.byName('warning'),
    trackColor: false,
    scaleColor: this.colors.byName('gray'),
    lineWidth: 15,
    lineCap: 'circle'
  };



  easyPiePercent3 = 34;

  @Input() seminars: any[];
  @Input() filterText = "";
  @Input() filterCategory = "";

  constructor(public colors: ColorsService) { }

  ngOnInit() {
  }

  calculatePercentage(seminar: any){
    var perc = ((seminar.attributes.seats-seminar.attributes.seatsOccupied) * 100) / seminar.attributes.seats;
    return perc;
  }

  calculatePieOption(seminar: any){
    var perc = ((seminar.attributes.seats-seminar.attributes.seatsOccupied) * 100) / seminar.attributes.seats;

    if(perc > 60){
      return this.pieOptionOK;
    }
    else if(perc > 30){
      return this.pieOptionWarning;
    }
    else{
      return this.pieOptionDanger;
    }
  }
}
